"use server";
import { connectTodb } from "@/db/connectTodb";
import { description } from "@/interfaces/Interface";
import { chatSession } from "@/lib/AI";
import { createDescription } from "@/services/GetDescription";
import { revalidatePath } from "next/cache";

export const addCommentAction = async (message: string) => {
  const resulte = await chatSession
    .sendMessage(message)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  console.log(resulte?.response.text());
  await connectTodb();
  const newDescription: description = {
    description: message,
    AIresult: resulte?.response.text(),
    user: "admin",
    date: new Date(Date.now()),
  };
  await createDescription(newDescription);
  revalidatePath("/chat");
};
