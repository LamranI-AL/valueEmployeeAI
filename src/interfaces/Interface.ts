export interface description {
  description: string;
  date: Date;
  user: string;
  AIresult: string;
}
export interface AiMessage {
  content: string;
  createdAt: Date;
  experimental_attachments: any;
  id: string;
  role: string;
}

export interface AIMessages {
  messages: AiMessage[];
  createdUser: string;
  createdAt: Date;
}
export interface user {
  name: string;
  email: string;
  image: string;
}
export interface User {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
