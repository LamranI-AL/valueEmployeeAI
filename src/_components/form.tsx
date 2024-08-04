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
import { chatSession } from "@/lib/AI";
import { addCommentAction } from "@/actions/addComment";

function Form() {
  const [imageUrl, setImageUrl] = useState("");

  const addTopic = async (formData: FormData) => {
    formData.append("imageUrl", imageUrl);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const img = formData.get("imageUrl") as string;
    const newTopic: any = {
      title: title,
      description: description,
      img: img,
    };
    const finalPrompt = `Le titre de mon article est : '${title}'. La description est : '${description}'`;
    addCommentAction(finalPrompt);
    // console.log(result);
    // const response =
    await fetch("/api/topics", {
      method: "POST",
      body: JSON.stringify(newTopic),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => toast.success("article added sucessfuly"))
      .catch(() => toast.error("error adding article"));
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full flex">
          Add article
          <PlusSquare />{" "}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form action={addTopic}>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>add new article</DrawerTitle>
              <DrawerDescription>
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
