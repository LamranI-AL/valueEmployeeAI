import { connectTodb } from "@/db/connectTodb";
import AIMessagesModel from "@/models/messages";
import { NextRequest, NextResponse } from "next/server";

// Handler pour la méthode GET
export async function GET(req: NextRequest) {
  try {
    await connectTodb(); // Connexion à la base de données
    const messages = await AIMessagesModel.find(); // Récupération des messages
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    return NextResponse.json(
      {
        message: "Erreur lors de la requête",
        error: error instanceof Error ? error.message : "Erreur inconnue",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// Handler pour la méthode POST
export async function POST(req: NextRequest) {
  try {
    await connectTodb(); // Connexion à la base de données
  } catch (error) {
    throw new Error(
      "Erreur de connexion à la base de données : " +
        (error instanceof Error ? error.message : error)
    );
  }

  try {
    const messageBody = await req.json(); // Extraction des données du corps de la requête
    console.log(messageBody);
    const newMessage = new AIMessagesModel(messageBody); // Création d'un nouveau document
    await newMessage.save(); // Enregistrement dans la base de données
    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("Erreur lors de la création du message :", error);
    return NextResponse.json(
      {
        message: "Erreur lors de la requête",
        error: error instanceof Error ? error.message : "Erreur inconnue",
        status: 500,
      },
      { status: 500 }
    );
  }
}