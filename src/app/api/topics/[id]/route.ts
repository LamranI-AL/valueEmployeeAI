import connectMongodb from "@/lib/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: {
    id: string;
  };
}
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    await connectMongodb();
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

    const newTopic = await request.json();
    if (!newTopic) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const updatedTopic = await Topic.findByIdAndUpdate(id, newTopic, {
      new: true,
    });
    if (!updatedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Update succeeded", topic: updatedTopic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating topic:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest, { params }: Props) {
  try {
    await connectMongodb();
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

    const topic = await Topic.findById(id);
    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Topic retrieved successfully", topic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving topic:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    await connectMongodb();
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

    const topic = await Topic.findByIdAndDelete(id);
    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Topic deleted successfully", topic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting topic:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
