import { User } from "../types/user";

export function getUser(id: number): User {
  switch (id) {
    case 1:
      return { id, username: "user 1" };
    case 2:
      return { id, username: "user 2" };
    default:
      return { id, username: "not found" };
  }
}

export function getProfilePicture(userId: number): string | undefined {
  return undefined;
}
