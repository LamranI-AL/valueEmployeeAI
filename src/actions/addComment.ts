"use server";
import { connectTodb } from "@/db/connectTodb";
import { description } from "@/interfaces/Interface";
import { chatSession } from "@/lib/AI";
import { createDescription } from "@/services/GetDescription";
import { revalidatePath } from "next/cache";

export const addCommentAction = async (message: string) => {
  const resulte = await chatSession.sendMessage(message);
  await connectTodb();
  const newDescription: description = {
    description: message,
    AIresult: resulte?.response.text() as string,
    user: "admin",
    date: new Date(Date.now()),
  };
  console.log(newDescription);
  await createDescription(newDescription);
  console.log(resulte?.response.text());
  console.log(typeof resulte?.response.text());
  revalidatePath("/chat");
  // return resulte?.response.text() as string;
};
