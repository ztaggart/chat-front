import { User } from "../types/user";

const defaultPicture =
  "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg";
const ProfilePictureContainer = ({ users }: { users: User[] }) => {
  console.log(users);
  return (
    <>
      {users.map((user) => {
        let profilePicture = defaultPicture; //getProfilePicture(user);
        return (
          <img
            key={user.id}
            className="rounded-full"
            src={profilePicture ? profilePicture : defaultPicture}
            alt="profile"
          ></img>
        );
      })}
    </>
  );
};

export default ProfilePictureContainer;
