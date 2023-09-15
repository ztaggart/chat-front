import { getProfilePicture, getUser } from "../services/user-service";
import { Conversation } from "../types/message";

const ConversationInfo = ({ conversation }: { conversation: Conversation }) => {
  const defaultPicture =
    "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg";
  return (
    <div className="m-4 flex bg-slate-500 rounded-md">
      <div className="w-8">
        {conversation.userIds.map((userId) => {
          let profilePicture = getProfilePicture(userId);
          return (
            <img
              key={userId}
              className="rounded-full"
              src={profilePicture ? profilePicture : defaultPicture}
            ></img>
          );
        })}{" "}
      </div>
      <div className="w-full ml-2">
        <div className="text-lg font-medium">
          {conversation.userIds.map((userId) => {
            if (
              userId !== conversation.userIds[conversation.userIds.length - 1]
            ) {
              return getUser(userId).username + ", ";
            } else {
              return getUser(userId).username;
            }
          })}
        </div>
        <div className="text-slate-200">
          {conversation.messages[conversation.messages.length - 1].message}
        </div>
      </div>
    </div>
  );
};

export default ConversationInfo;
