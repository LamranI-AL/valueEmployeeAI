export interface description {
  description: string;
  date: Date;
  user: string;
  AIresult: string;
  topicCustomId: string;
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
export interface topic {
  _id: string;
  title: string;
  description: string;
  img: string;
  customId: string;
  author: string;
}

interface Concept {
  name: string;
  description: string;
  examples: string[];
}

interface Resource {
  type: string;
  name: string;
  lien: string;
  auteur?: string; // Ce champ est optionnel
}

interface Details {
  overview: string;
  concepts: Concept[];
  resources: Resource[];
  how_to: string;
}

// Exemple d'utilisation de l'interface pour l'objet complet
export interface descriptionAiArticle {
  article: string;
  details: Details;
}
