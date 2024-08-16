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
export const chatSession1 = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: '"J\'ai un texte entre parenthèses contenant le titre et la description d\'un article : ("Le titre de mon article est : \'Intelligence artificielle et la relation entre machine learning et Python\'. La description est : \'L\'intelligence artificielle (IA) est une technologie puissante basée sur le machine learning. Python, avec ses nombreuses bibliothèques, simplifie grandement le développement et l\'implémentation de ces technologies.\'). Pouvez-vous développer cet article en fournissant des explications détaillées et accessibles sur les sujets abordés, des exemples concrets pour illustrer les concepts, ainsi que des ressources supplémentaires pour approfondir la compréhension du lecteur ? Le tout doit être présenté de manière claire et compréhensible, afin qu\'un client puisse bien comprendre le sujet dès le titre et la description, et avoir une idée précise des concepts abordés." dans un format json qui contient : "article" , "details" qui contient : "overview" , "concepts",  resources , how_to   " \n\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "article": "Intelligence artificielle et la relation entre machine learning et Python",\n  "details": {\n    "overview": "L\'intelligence artificielle (IA) est une technologie révolutionnaire qui permet aux machines d\'imiter l\'intelligence humaine. Le machine learning, un sous-domaine de l\'IA, permet aux systèmes d\'apprendre à partir de données sans être explicitement programmés. Python, avec ses vastes bibliothèques dédiées au machine learning, est le langage de programmation préféré pour les développeurs d\'IA.",\n    "concepts": [\n      {\n        "name": "Intelligence artificielle",\n        "description": "L\'IA vise à créer des systèmes capables d\'accomplir des tâches qui nécessitent généralement une intelligence humaine, telles que la reconnaissance d\'images, la traduction automatique et la prise de décisions.",\n        "examples": [\n          "Les assistants virtuels comme Siri et Alexa",\n          "Les systèmes de recommandation sur les plateformes de streaming",\n          "Les voitures autonomes"\n        ]\n      },\n      {\n        "name": "Machine learning",\n        "description": "Le machine learning permet aux systèmes d\'apprendre à partir de données et d\'améliorer leurs performances au fil du temps. Il existe différents types d\'apprentissage : supervisé, non supervisé et par renforcement.",\n        "examples": [\n          "La classification d\'images pour identifier des objets",\n          "La prédiction des prix de l\'immobilier",\n          "Le filtrage du spam dans les boîtes de réception"\n        ]\n      },\n      {\n        "name": "Python et les bibliothèques de machine learning",\n        "description": "Python est un langage de programmation polyvalent, facile à apprendre et riche en bibliothèques dédiées au machine learning, ce qui le rend idéal pour le développement d\'applications d\'IA.",\n        "examples": [\n          "Scikit-learn : une bibliothèque puissante pour l\'apprentissage supervisé et non supervisé",\n          "TensorFlow : une bibliothèque open source pour l\'apprentissage profond",\n          "PyTorch : une bibliothèque flexible et efficace pour l\'apprentissage profond",\n          "Keras : une API de haut niveau simplifiant le développement de modèles d\'apprentissage profond"\n        ]\n      }\n    ],\n    "resources": [\n      {\n        "type": "Livre",\n        "name": "Python Machine Learning",\n        "auteur": "Sebastian Raschka",\n        "lien": "https://www.amazon.com/Python-Machine-Learning-Sebastian-Raschka/dp/1789130141"\n      },\n      {\n        "type": "Cours en ligne",\n        "name": "Machine Learning Specialization",\n        "plateforme": "Coursera",\n        "lien": "https://www.coursera.org/specializations/machine-learning"\n      },\n      {\n        "type": "Documentation",\n        "name": "Documentation Scikit-learn",\n        "lien": "https://scikit-learn.org/stable/user_guide.html"\n      }\n    ],\n    "how_to": "Pour commencer à apprendre le machine learning avec Python, il est recommandé de suivre les étapes suivantes : \\n\\n1. Installer Python et les bibliothèques nécessaires (Scikit-learn, TensorFlow, etc.). \\n2. Commencer par des exemples simples de machine learning, comme la classification de données. \\n3. Explorer les différents types d\'apprentissage (supervisé, non supervisé, par renforcement). \\n4. Apprendre à évaluer la performance des modèles de machine learning. \\n5. Se familiariser avec les concepts avancés comme l\'apprentissage profond et le traitement du langage naturel."\n  }\n}\n```',
        },
      ],
    },
  ],
});
