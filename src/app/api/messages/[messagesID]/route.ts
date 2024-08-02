import { connectTodb } from "@/db/connectTodb";
import { AIMessages } from "@/interfaces/Interface";
import AIMessagesModel from "@/models/messages";
import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: {
    messagesID: string;
  };
}
// update one
export async function PUT(req: NextRequest, { params }: Props) {
  try {
    await connectTodb();
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { message: "Error connecting to the database" },
      { status: 500 }
    );
  }
  try {
    const { messagesID } = params;
    if (!messagesID) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    const newMessagesUpdated: Partial<AIMessages> = await req.json();
    if (!newMessagesUpdated) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const updatedMessages = await AIMessagesModel.findByIdAndUpdate(
      messagesID,
      newMessagesUpdated,
      {
        new: true,
      }
    );

    if (!updatedMessages) {
      return NextResponse.json({
        message: "messages non trouvé",
        status: 404,
      });
    }

    return NextResponse.json(updatedMessages);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des messages :", error);
    return NextResponse.json({
      message: "Erreur lors de la requête",
      error: error instanceof Error ? error.message : "Erreur inconnue",
      status: 500,
    });
  }
}
// delete one
export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    await connectTodb();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error connecting to the database" },
      { status: 500 }
    );
  }
  try {
    const { messagesID } = params;

    const deletedMessages = await AIMessagesModel.findByIdAndDelete(messagesID);

    if (!deletedMessages) {
      return NextResponse.json({
        message: "messgaes non trouvé",
        status: 404,
      });
    }

    return NextResponse.json(deletedMessages);
  } catch (error) {
    console.error("Erreur lors de la suppression des messages :", error);
    return NextResponse.json({
      message: "Erreur lors de la requête",
      error: error instanceof Error ? error.message : "Erreur inconnue",
      status: 500,
    });
  }
}
// get one
export async function GET(request: NextRequest, { params }: Props) {
  try {
    await connectTodb();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error connecting to the database" },
      { status: 500 }
    );
  }
  try {
    const { messagesID } = params;
    if (!messagesID) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const Employee = await AIMessagesModel.findById(messagesID);
    if (!Employee) {
      return NextResponse.json(
        { message: "messages not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(Employee);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
