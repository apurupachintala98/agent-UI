export interface Message {
  id: string;
  role: "user" | "assistant";
  text?: string;
  content?: string | JSX.Element;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  session_id: string;
}
