import { connectTodb } from "@/db/connectTodb";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";
import bycrypt from "bcryptjs";
import { User } from "@/interfaces/Interface";

export async function POST(req: Request) {
  const request: User = await req.json();
  console.log(request);
  try {
    await connectTodb();
  } catch (error: any) {
    return new NextResponse(error, {
      status: 500,
    });
  }
  const existingUser = await UserModel.find({ email: request.email });
  if (existingUser.length > 0) {
    return new NextResponse("User already exists", { status: 400 });
  }
  const hashedPassword = await bycrypt.hash(request.password, 5);
  const newUser = new UserModel({
    email: request.email,
    password: hashedPassword,
    name: request.name,
  });
  try {
    await newUser.save();
    return new NextResponse("User created successfully", {
      status: 201,
    });
  } catch (error: any) {
    console.log("u have error");
    return new NextResponse(error, {
      status: 500,
    });
  }
}
