"use server";
import { connectTodb } from "@/db/connectTodb";
import { description } from "@/interfaces/Interface";
import { chatSession, chatSession1 } from "@/lib/AI";

export const addCommentAction = async (
  message: string,
  sessionUser: string,
  topicCustomId: string
) => {
  // console.log(sessionUser);
  const resulte = await chatSession
    .sendMessage(message)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  await connectTodb();
  const newDescription: description = {
    description: message,
    AIresult: resulte?.response.text(),
    user: sessionUser,
    date: new Date(Date.now()),
    topicCustomId: topicCustomId,
  };
  console.log(newDescription);
  return newDescription;
};
export const addDetails = async (message: string, sessionUser: string) => {
  // console.log(sessionUser);
  const resulte = await chatSession1
    .sendMessage(message)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  await connectTodb();
  const newDetails = {
    description: message,
    AIresult: resulte?.response.text(),
    user: sessionUser,
    date: new Date(Date.now()),
  };
  console.log(newDetails);
  return newDetails;
};
