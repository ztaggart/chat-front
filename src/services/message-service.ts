import axios from "axios";
import { Conversation, Message } from "../types/message";

export async function getAllMessagesById(userId: number): Promise<Message[]> {
  console.log("getting messages" + userId);
  return await axios.get(`http://localhost:8080/messages?userId=${userId}`);
}

export async function getAllMessages(token: string): Promise<Message[]> {
  let resp = await axios.get(`http://localhost:8080/messages`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return resp.data;
}

export async function getAllConversations(
  token: string,
  userId: number
): Promise<Conversation[]> {
  console.log("getting conversations");
  let resp = await axios.get(`http://localhost:8080/conversations/${userId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  console.log("got conversations");
  return resp.data;
}
