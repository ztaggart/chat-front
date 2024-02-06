import { useState } from "react";
import { getUser } from "../services/user-service";
import { Message } from "../types/message";

const MessageContainer = ({ message }: { message: Message }) => {
  const currentUsername = "joe";
  return (
    <div
      className={`flex ${
        currentUsername === message.from ? "justify-end" : "justify-start"
      }`}
    >
      <div className="m-2 bg-slate-600 shadow-md rounded-xl">
        <div className="m-2">
          From:{" " + message.from}
          <br />
          <span className=" text-slate-200">{message.message}</span>
          <br />
          {message.time}
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
