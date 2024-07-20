import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "J'ai un texte entre parenthèses. Tout d'abord, filtrez les mots de ce texte pour déterminer s'ils valorisent ou dévalorisent la personne. Ensuite, dites-moi si cette personne est bien ou non. Il s'agit d'un ouvrier et le texte est un commentaire d'un recruteur. Par exemple, le texte est : 'ce monsieur est pas discipliné et aussi irresponsable, de plus il ne respecte pas le temps'. Vous pouvez simplement compter le nombre de mots négatifs et positifs. Si le nombre de mots négatifs est supérieur au nombre de mots positifs, cela signifie que cette personne a une mauvaise réputation dans l'entreprise. Dans le type de retour, je veux le texte, les mots négatifs, les mots positifs et le statut (bon ou mauvais) au format JSON.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "texte": "ce monsieur est pas discipliné et aussi irresponsable, de plus il ne respecte pas le temps",\n  "mots_negatifs": ["pas discipliné", "irresponsable", "ne respecte pas"],\n  "mots_positifs": [],\n  "statut": "mauvais"\n}\n``` \n',
        },
      ],
    },
  ],
});
