import { connectTodb } from "@/db/connectTodb";
import { description } from "@/interfaces/Interface";
import Description from "@/models/descriptions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectTodb();
  } catch (error) {
    throw new Error("error connectin to db : " + error);
  }
  try {
    const descriptions: description[] = await Description.find();
    return NextResponse.json(descriptions);
  } catch (error) {
    console.error("Erreur lors de la récupération des descriptions :", error);
    return NextResponse.json({
      message: "Erreur lors de la requête",
      error: error instanceof Error ? error.message : "Erreur inconnue",
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectTodb();
  } catch (error) {
    throw new Error("error connectin to db : " + error);
  }
  try {
    const requestData: description = await req.json();
    const description = new Description(requestData);
    await description.save();
    return NextResponse.json(description);
  } catch (error) {
    console.error("Erreur lors de la récupération des description :", error);
    return NextResponse.json({
      message: "Erreur lors de la requête",
      error: error instanceof Error ? error.message : "Erreur inconnue",
      status: 500,
    });
  }
}
