import { useEffect, useState, useContext, useCallback } from "react";
import "../App.css";
import { getAllMessages } from "../services/message-service";
import MessageContainer from "./message-container";
import { Client, Message as StompMessage, over } from "stompjs";
import SockJS from "sockjs-client";
import {
  Conversation,
  Message,
  ReceivedMessage,
  SendingMessage,
} from "../types/message";
import { UserData } from "../hooks/use-userdata";
import { StompContext, UserContext } from "../App";
import ProfilePictureContainer from "./profile-picture-container";

const SOCKET_URL = "http://localhost:8080/chat";

const ConversationContainer = ({
  activeConversation,
}: {
  activeConversation: Conversation | undefined;
}) => {
  const { userData, setUserData } = useContext(UserContext);
  const { stompClient } = useContext(StompContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sendingMessage, setSendingMessage] = useState("");

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
        conversationId: payloadData.conversationId,
      };
      setMessages((messages) => [...messages, newMessage]);
    }
    console.log("subscribing");
    // stompClient.subscribe("/chatroom/public", onMessageReceived);
  }

  useEffect(() => {
    // getAllMessages(userData.jwt).then((messages) => {
    //   setMessages(messages);
    // });
    stompClient.connect(
      { Authorization: "Bearer " + userData.jwt },
      onConnected,
      onError
    );
  }, []);

  function sendMessage() {
    console.log("message");
    if (!activeConversation) {
      return;
    }
    let chatMessage: SendingMessage = {
      message: sendingMessage,
      from: userData.username,
      time: new Date(Date.now()).toISOString(),
      conversationId: activeConversation.id,
    };
    console.log(chatMessage);
    stompClient.send(
      "/app/chat",
      {
        Authorization: "Bearer " + userData.jwt,
      },
      JSON.stringify(chatMessage)
    );
    setSendingMessage("");
  }

  function onError() {
    console.log("Error in connecting to socket");
  }

  return (
    <div className="bg-slate-100 w-3/4 flex flex-col">
      {activeConversation && (
        <div className="banner bg-sky-400 flex">
          <div className="w-8 ml-2">
            <ProfilePictureContainer
              users={activeConversation.users}
            ></ProfilePictureContainer>
          </div>
          <div className="pb-1 pl-5 flex items-center">
            {activeConversation?.topic ||
              activeConversation?.users.map((user) => user.username).join(", ")}
          </div>
        </div>
      )}
      <div>
        {messages.map((message) => (
          <MessageContainer
            message={message}
            key={message.id}
          ></MessageContainer>
        ))}
      </div>
      <div className="w-full flex mt-auto ">
        <input
          className="col-span-7 rounded-md w-auto flex-1"
          type="text"
          value={sendingMessage}
          onChange={({ target }) => setSendingMessage(target.value)}
        ></input>
        <button className="bg-slate-500 rounded-md px-2" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ConversationContainer;
