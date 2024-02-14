import { useContext, useEffect, useState } from "react";
import "../App.css";
import { useUserData } from "../hooks/use-userdata";
import { getAllConversations } from "../services/message-service";
import { Conversation } from "../types/message";
import ConversationInfo from "./conversation-info";
import { UserContext } from "../App";

const SidebarContainer = ({
  logOut,
  activeConversation,
  setActiveConversation,
}: {
  logOut: () => void;
  activeConversation: Conversation | undefined;
  setActiveConversation: (conv: Conversation) => void;
}) => {
  const { userData } = useContext(UserContext);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    getAllConversations(userData.jwt, userData.userId).then((convs) => {
      setConversations(convs);
      if (convs.length > 0) {
        setActiveConversation(convs[0]);
      }
      console.log(convs);
    });
  }, []);
  return (
    <div className="bg-slate-300 flex flex-col justify-between w-1/4">
      {conversations.map((conversation) => {
        return (
          <ConversationInfo
            key={conversation.id}
            conversation={conversation}
            active={activeConversation?.id === conversation.id}
          ></ConversationInfo>
        );
      })}
      <div className="bg-slate-500 flex items-center pl-3">
        <div className="w-8">
          <img
            className="rounded-full"
            src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
            alt="profile"
          />
          {/* <button className="bg-blue-500 p-2 rounded-md" onClick={logOut}>
            Log out
          </button> */}
        </div>
        <div className="pl-5 p-4">{userData.username}</div>
        <div className="text-slate-950 border-slate-950 font-bold text-xl ml-auto px-5">
          &#9881;
        </div>
      </div>
    </div>
  );
};

export default SidebarContainer;
