import "../App.css";
import { getAllConversations } from "../services/message-service";
import { Conversation } from "../types/message";
import ConversationInfo from "./conversation-info";

const SidebarContainer = () => {
  const conversations: Conversation[] = getAllConversations();
  return (
    <div className="col-span-4 bg-red-600">
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
