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
          text: "J'ai un texte entre parenthèses contenant un titre et une description. (\"Le titre de mon article est : 'Intelligence artificielle et la relation entre machine learning et Python'. La description est : 'L'IA est un outil très puissant basé sur le machine learning en général, mais il existe des bibliothèques Python qui facilitent les choses.'). Pouvez-vous me proposer des articles similaires, avec des titres et descriptions correspondants, au format JSON ?",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "title": "L\'apprentissage automatique avec Python : un guide pour les débutants",\n    "description": "Découvrez les bases de l\'apprentissage automatique et apprenez à utiliser des bibliothèques Python populaires comme scikit-learn pour construire des modèles prédictifs."\n  },\n  {\n    "title": "Les meilleurs frameworks Python pour l\'intelligence artificielle",\n    "description": "Explorez les frameworks Python les plus populaires pour le développement de l\'IA, tels que TensorFlow, PyTorch et Keras, et découvrez leurs fonctionnalités clés."\n  },\n  {\n    "title": "Applications de l\'intelligence artificielle basées sur le machine learning avec Python",\n    "description": "Découvrez des exemples concrets d\'applications de l\'IA basées sur le machine learning, tels que la vision par ordinateur, le traitement du langage naturel et la robotique, et comment les développer avec Python."\n  },\n  {\n    "title": "L\'intelligence artificielle : un outil puissant pour le développement web",\n    "description": "Apprenez comment intégrer des fonctionnalités d\'IA dans vos applications web à l\'aide de Python et de bibliothèques spécialisées."\n  },\n  {\n    "title": "Les défis éthiques de l\'intelligence artificielle et le rôle de Python",\n    "description": "Explorez les implications éthiques de l\'IA et comment les développeurs Python peuvent contribuer à créer une IA responsable."\n  }\n]\n```\n',
        },
      ],
    },
  ],
});
