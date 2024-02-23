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
import { UserContext } from "../App";
import ProfilePictureContainer from "./profile-picture-container";
import ChatBox from "./chat-box";

const SOCKET_URL = "http://localhost:8080/chat";

const ConversationContainer = ({
  activeConversation,
}: {
  activeConversation: Conversation | undefined;
}) => {
  const { userData, setUserData } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [client, setClient] = useState<Client | undefined>(undefined);
  const [clientConnected, setClientConnected] = useState(false);

  function onMessageReceived(payload: StompMessage) {
    let payloadData: Message = JSON.parse(payload.body);
    const newMessage: Message = {
      message: payloadData.message,
      from: payloadData.from,
      id: payloadData.id,
      time: payloadData.time,
      conversationId: payloadData.conversationId,
    };
    setMessages((messages) => [...messages, newMessage]);
  }

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/chat");
    const client = over(socket);

    client.connect(
      {},
      () => {
        client?.subscribe("/chatroom/public", onMessageReceived);
      },
      onError
    );

    setClient(client);

    getAllMessages(userData.jwt).then((messages) => setMessages(messages));
    return () => {
      if (clientConnected) {
        client.disconnect(() => console.log("disconnected"));
      } else {
        setTimeout(
          () => client.disconnect(() => console.log("disconnected")),
          1000
        );
      }
    };
  }, []);

  function sendMessage(msg: string) {
    if (!activeConversation || !client) {
      return;
    }
    let chatMessage: SendingMessage = {
      message: msg,
      from: userData.username,
      time: new Date(Date.now()).toISOString(),
      conversationId: activeConversation.id,
    };
    client.send(
      "/app/chat",
      {
        Authorization: "Bearer " + userData.jwt,
      },
      JSON.stringify(chatMessage)
    );
  }

  function onError() {
    console.log("Error in connecting to socket");
  }

  return (
    <div className="bg-slate-100 w-3/4 flex flex-col relative">
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
      <div className="overflow-auto">
        {messages.map((message) => (
          <MessageContainer
            message={message}
            key={message.id}
          ></MessageContainer>
        ))}
      </div>
      <ChatBox sendMessage={sendMessage}></ChatBox>
    </div>
  );
};

export default ConversationContainer;
