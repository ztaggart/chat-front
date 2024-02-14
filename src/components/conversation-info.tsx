import { getProfilePicture, getUser } from "../services/user-service";
import { Conversation } from "../types/message";
import "../styles/sidebar.css";
import ProfilePictureContainer from "./profile-picture-container";

const ConversationInfo = ({
  conversation,
  active,
}: {
  conversation: Conversation;
  active: boolean;
}) => {
  const defaultPicture =
    "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg";
  return (
    <div
      className={
        "conversation m-4 flex rounded-md " + (active ? "active" : undefined)
      }
    >
      <div className="w-8 flex-2">
        <ProfilePictureContainer
          users={conversation.users}
        ></ProfilePictureContainer>
      </div>
      <div className="w-full ml-2 flex items-center">
        <span className="pb-1 pl-5">
          {conversation.topic ||
            conversation.users.map((user) => user.username).join(", ")}
        </span>
      </div>
    </div>
  );
};

export default ConversationInfo;
