import { useEffect, useState, useContext, useCallback } from "react";
import "../App.css";
import { getAllMessages } from "../services/message-service";
import MessageContainer from "./message-container";
import { Client, Message as StompMessage, over } from "stompjs";
import SockJS from "sockjs-client";
import { Message, ReceivedMessage, SendingMessage } from "../types/message";
import { UserData } from "../hooks/use-userdata";
import { UserContext } from "../App";

const SOCKET_URL = "http://localhost:8080/chat";

const ConversationContainer = (/*{ userData }: { userData: UserData }*/) => {
  const { userData, setUserData } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sendingMessage, setSendingMessage] = useState("");
  const [stompClient, setStompClient] = useState(over(new SockJS(SOCKET_URL)));

  

  useEffect(() => {
    function onConnected() {
      function onMessageReceived(payload: StompMessage) {
        console.log(messages);
        console.log("message received");
        let payloadData: Message = JSON.parse(payload.body);
        console.log(payloadData);
        const newMessage: Message = {
          message: payloadData.message,
          from: payloadData.from,
          id: payloadData.id,
          time: payloadData.time,
        };
        setMessages(messages => [...messages, newMessage]);
      }
  
      console.log("subscribing");
      stompClient.subscribe("/chatroom/public", onMessageReceived);
    };

    getAllMessages(userData.jwt).then((messages) => {
      console.log("got messages");
      console.log(messages);
      setMessages(messages);
    });
    stompClient.connect({}, onConnected, onError);
    console.log(userData)
  }, []);

  function sendMessage() {
    let chatMessage: SendingMessage = {
      message: sendingMessage,
      from: userData.username,
      time: new Date(Date.now()).toISOString(),
    };
    console.log(chatMessage);
    stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
    setSendingMessage("");
  }

  function onError() {
    console.log("Error in connecting to socket");
  }

  return (
    <div className="col-span-8 bg-blue-600 relative">
      <div>
        {messages.map((message) => (
          <MessageContainer
            message={message}
            key={message.id}
          ></MessageContainer>
        ))}
      </div>
      <div className="grid grid-cols-8 w-full bottom-0 sticky">
        <input
          className="col-span-7 rounded-md"
          type="text"
          value={sendingMessage}
          onChange={({ target }) => setSendingMessage(target.value)}
        ></input>
        <button className="bg-slate-500 rounded-md" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ConversationContainer;
