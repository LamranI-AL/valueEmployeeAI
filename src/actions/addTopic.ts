"use server";
// import { postTopic, topic } from "@/_components/topics-list";
import { revalidatePath } from "next/cache";

export const addTopicAction = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const img = formData.get("imageUrl") as string;
  // console.log(title, description, img);
  // console.log(formData);
  const newTopic: any = {
    title: title,
    description: description,
    img: img,
  };
  console.log(newTopic);
  // await postTopic(newTopic).then(() => console.log("topic add sucess"));
  revalidatePath("/chat/articles/add-article");
};
