import { useState } from "react";
import "../App.css";
import { getAllMessages } from "../services/message-service";
import MessageContainer from "./message-container";

const ConversationContainer = () => {
  const [messages, setMessages] = useState(getAllMessages());
  const [sendingMessage, setSendingMessage] = useState("");

  function sendMessage() {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        to: 2,
        from: 1,
        message: sendingMessage,
        time: new Date(),
      },
    ]);
    setSendingMessage("");
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
        <button className=" bg-slate-500 rounded-md" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ConversationContainer;
