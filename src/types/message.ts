export interface Conversation {
  id: number;
  userIds: number[];
  messages: Message[];
}

export interface ConversationInfo {
  lastMessage: Message;
  isGroup: boolean;
}

export interface Message {
  id: number;
  to: number; // id that sent message
  from: number; // id that received message
  message: string; // the message
  time: Date; //timestamp
}
