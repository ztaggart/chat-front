import { User } from "../types/user";
import axios from "axios";

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

export async function logIn(username: string, password: string) {
  return await axios.post("http://localhost:8080/auth/login", {
    username: username,
    password: password,
  });
}

export async function register(username: string, password: string) {
  return await axios.post("http://localhost:8080/auth/register", {
    username,
    password,
  });
}
