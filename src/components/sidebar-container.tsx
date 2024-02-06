import "../App.css";
import { useUserData } from "../hooks/use-userdata";
import { getAllConversations } from "../services/message-service";
import { Conversation } from "../types/message";
import ConversationInfo from "./conversation-info";

const SidebarContainer = ({ logOut }: { logOut: () => void }) => {
  const conversations: Conversation[] = []; //getAllConversations();
  return (
    <div className="col-span-4 bg-red-600">
      <div className="m-4">
        <button className="bg-blue-500 p-2 rounded-md" onClick={logOut}>
          Log out
        </button>
      </div>
      {conversations.map((conversation) => {
        return (
          <ConversationInfo
            key={conversation.id}
            conversation={conversation}
          ></ConversationInfo>
        );
      })}
    </div>
  );
};

export default SidebarContainer;
