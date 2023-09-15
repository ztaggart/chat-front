import { useState } from "react";
import { getUser } from "../services/user-service";
import { Message } from "../types/message";

const MessageContainer = ({ message }: { message: Message }) => {
  const currentUserID = 1;
  return (
    <div
      className={`flex ${
        currentUserID === message.from ? "justify-end" : "justify-start"
      }`}
    >
      <div className="m-2 bg-slate-600 shadow-md rounded-xl">
        <div className="m-2">
          To: {getUser(message.to).username}, From:{" "}
          {getUser(message.from).username}
          <br />
          <span className=" text-slate-200">{message.message}</span>
          <br />
          {message.time.toUTCString()}
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
