export interface Conversation {
  id: number;
  userIds: number[];
  messages: Message[];
}

export interface ConversationInfo {
  lastMessage: Message;
  isGroup: boolean;
}

// message without id
export interface SendingMessage {
  from: string; // id that received message
  message: string; // the message
  time: String; //unix timestamp
  // to: string; // user that sent message
}

export interface Message extends SendingMessage {
  id: number;
}

export interface ReceivedMessage {
  message: string;
  from: string;
}
