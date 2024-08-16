"use client";
import { UploadButton } from "@/app/utils/uploadthing";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addCommentAction } from "@/actions/addComment";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { topic } from "@/interfaces/Interface";
import { useRouter } from "next/navigation";

function Form() {
  const { data: session } = useSession();
  const router = useRouter();
  const id = uuidv4();
  const [imageUrl, setImageUrl] = useState("");
  const addTopic = async (formData: FormData) => {
    const toasId = toast.loading("Adding article...");
    formData.append("imageUrl", imageUrl);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const img = formData.get("imageUrl") as string;
    const newTopic: topic | any = {
      title: title,
      description: description,
      img: img,
      customId: id as string,
      author: session?.user?.email ?? "user",
    };
    const finalPrompt = `Le titre de mon article est : '${title}'. La description est : '${description}'`;
    const descriptionFromAction = await addCommentAction(
      finalPrompt,
      session?.user?.name as string,
      id
    );
    await fetch("/api/description", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(descriptionFromAction),
    });
    toast.success("description added");
    toast.dismiss(toasId);

    await fetch("/api/topics", {
      method: "POST",
      body: JSON.stringify(newTopic),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => toast.success("article added sucessfuly"))
      .catch(() => toast.error("error adding article"));
    router.push("/articles/my-articles");
  };
  return (
    <Drawer>
      <DrawerTrigger className="w-full" asChild>
        <Button variant="outline" className="w-full mt-3">
          Add article
          <PlusSquare />{" "}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <form action={addTopic}>
          <div className="mx-auto w-full max-w-xl">
            <DrawerHeader>
              <DrawerTitle className="text-center">Add new article</DrawerTitle>
              <DrawerDescription className="text-center">
                Set: image , title, description for your article.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="">
                <UploadButton
                  // className="w-full"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // actions for response
                    const uploadedImageUrl = res[0].url;
                    setImageUrl(uploadedImageUrl);
                    console.log("Files: ", uploadedImageUrl);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do anythin with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                <div>
                  <Label htmlFor="title" className="p-3">
                    Title
                  </Label>
                  <div className="relative">
                    <Input type="text" name="title" placeholder="Enter title" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description" className="p-3">
                    Description
                  </Label>
                  <div className="relative">
                    <Textarea
                      rows={4}
                      name="description"
                      placeholder="Enter description"
                    />
                  </div>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button type="submit">Add</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default Form;
