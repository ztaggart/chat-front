import { Conversation, Message } from "../types/message";

export function getAllMessages(): Message[] {
  return [
    { id: 1, to: 1, from: 2, message: "hello", time: new Date() },
    { id: 2, to: 2, from: 1, message: "hello back", time: new Date() },
  ];
}

export function getAllConversations(): Conversation[] {
  return [
    {
      id: 1,
      userIds: [1, 2],
      messages: getAllMessages(),
    },
  ];
}
