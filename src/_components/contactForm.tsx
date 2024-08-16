"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { noteSchema } from "@/schemas/NoteSchema";
const ContactPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const addTopic = async (formData: FormData) => {
    const toasId = toast.loading("Adding note...");
    const title = formData.get("topic") as string;
    const note = formData.get("note") as string;
    const newInput = {
      title: title,
      description: note,
    };
    const newNote: any = {
      title: title,
      description: note,
      author: session?.user?.email ?? "user",
      date: new Date(Date.now()),
    };
    const result = noteSchema.safeParse(newInput);
    if (!result.success) {
      toast.dismiss(toasId);
      toast.error(result.error.issues[0].message);
      return;
    }
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      const data = await response.json();
      toast.dismiss(toasId);
      toast.success("note added successfully");
      toast.success(
        "Thank you for your message. We will respond soon, Insha'Allah. "
      );
      router.push("/articles");
      return data;
    } catch (error) {
      toast.dismiss(toasId);
      toast.error("Error adding note");
      return error;
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-xl w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-cyan-100 ">
          Contact us
        </h1>
        <form action={addTopic}>
          <div className="mb-4">
            <Label
              htmlFor="subject"
              className="block text-gray-700 font-semibold mb-2 dark:text-gray-200"
            >
              Subject
            </Label>
            <Input type="text" name="topic" placeholder="Subject..." />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2 dark:text-gray-200"
            >
              Quick note
            </Label>
            <Textarea
              name="note"
              placeholder="Entrez la description"
              rows={5}
            ></Textarea>
          </div>
          <div className="text-center">
            <Button
              variant={"outline"}
              className="  dark:text-cyan-100  border dark:border-cyan-200  w-full dark:hover:border-cyan-500 dark:hover:text-cyan-500"
              type="submit"
            >
              Envoyer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
