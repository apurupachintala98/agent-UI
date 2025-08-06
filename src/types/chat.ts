export interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}
