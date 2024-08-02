import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
export async function POST(req: Request) {
  const request = await req.json();
  const prompt = request.data.prompt;
  const geminiStream = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(prompt);
  const stream = GoogleGenerativeAIStream(geminiStream);
  return new StreamingTextResponse(stream);
}
