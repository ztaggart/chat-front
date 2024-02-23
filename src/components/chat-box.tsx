import { useState } from "react";

const ChatBox = ({ sendMessage }: { sendMessage: (msg: string) => void }) => {
  const [sendingMessage, setSendingMessage] = useState("");
  return (
    <div className="w-full flex mt-auto chatbox px-2 pb-4">
      <div className="w-full flex mt-auto chatbox bg-slate-300 p-1">
        <input
          className="col-span-7 w-full flex-1 bg-slate-300 outline-none"
          type="text"
          value={sendingMessage}
          onChange={({ target }) => setSendingMessage(target.value)}
        ></input>
        <button
          onClick={() => {
            sendMessage(sendingMessage);
            setSendingMessage("");
          }}
          className="border border-black mr-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
