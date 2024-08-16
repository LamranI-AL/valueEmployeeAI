import { connectTodb } from "@/db/connectTodb";
import { description } from "@/interfaces/Interface";
import Description from "@/models/descriptions";
// import { AIMessages } from "@/interfaces/Interface";
// import AIMessagesModel from "@/models/messages";
import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: {
    id: string;
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
    const { id } = params;
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    const newdescriptionUpdated: Partial<description> = await req.json();
    if (!newdescriptionUpdated) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const updatedDescription = await Description.findByIdAndUpdate(
      id,
      newdescriptionUpdated,
      {
        new: true,
      }
    );

    if (!updatedDescription) {
      return NextResponse.json({
        message: "description non trouvé",
        status: 404,
      });
    }

    return NextResponse.json(updatedDescription);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des description :", error);
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
    const { id } = params;

    const deleteddescription = await Description.findByIdAndDelete(id);

    if (!deleteddescription) {
      return NextResponse.json({
        message: "description non trouvé",
        status: 404,
      });
    }

    return NextResponse.json(deleteddescription);
  } catch (error) {
    console.error("Erreur lors de la suppression des description :", error);
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
    const { id } = params;
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const description = await Description.find({
      topicCustomId: id,
    });
    if (!description) {
      return NextResponse.json(
        { message: "messages not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(description);
  } catch (error) {
    console.error("Error retrieving description:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
