import { useContext, useState } from "react";
import { getUser } from "../services/user-service";
import { Message } from "../types/message";
import { UserContext } from "../App";

const MessageContainer = ({ message }: { message: Message }) => {
  const { userData, setUserData } = useContext(UserContext);
  return (
    <div
      className={`flex ${
        userData.username === message.from ? "justify-end" : "justify-start"
      } w-full`}
    >
      <div className="m-2 bg-slate-600 shadow-md rounded-xl w-3/4">
        <div className="m-2">
          From:{" " + message.from}
          <br />
          <span className="text-slate-200 break-words">{message.message}</span>
          <br />
          {message.time}
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
