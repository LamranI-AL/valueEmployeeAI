import connectMongodb from "@/lib/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, img, author, date, customId } =
    await request.json();
  await connectMongodb();
  await Topic.create({ title, description, img, author, date, customId });
  return NextResponse.json(
    { message: "topic creat succesfully" },
    { status: 201 }
  );
}
export async function GET(request: NextRequest) {
  //   const { title, description } = await request.json();
  try {
    await connectMongodb();
    const data = await Topic.find();
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
