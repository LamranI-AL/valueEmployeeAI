"use server";

import { AiObject } from "@/app/chat/page";
import { connectTodb } from "@/db/connectTodb";
import { chatSession } from "@/lib/AI";

export const addCommentAction = async (message: string) => {
  const resulte = await chatSession.sendMessage(message);
  await connectTodb();
  console.log(resulte?.response.text());
  console.log(message);
  return resulte?.response.text();
};
