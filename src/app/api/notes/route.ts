import connectMongodb from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, author, date } = await request.json();
  await connectMongodb();
  await Note.create({ title, description, author, date });
  return NextResponse.json(
    { message: "note creat succesfully" },
    { status: 201 }
  );
}
export async function GET(request: NextRequest) {
  //   const { title, description } = await request.json();
  try {
    await connectMongodb();
    const data = await Note.find();
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
