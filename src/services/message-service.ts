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
  token: string
): Promise<Conversation[]> {
  return [
    {
      id: 1,
      userIds: [1, 2],
      messages: await getAllMessages(token),
    },
  ];
}
