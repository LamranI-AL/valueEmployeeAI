"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
interface topic {
  _id: string;
  title: string;
  description: string;
  img: string;
  customId: string;
  author: string;
}
interface Props {
  topics: topic[];
}
function TopicsList({ topics }: Props) {
  const pathName = usePathname();
  const deleteArticle = async (id: string) => {
    const toasId = toast.loading("deleting....");
    await fetch(`/api/topics/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        toast.dismiss(toasId);
        toast.success("Topic deleted");
      })
      .catch(() => {
        toast.dismiss(toasId);
        toast.error("Error deleting topic");
      });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5  gap-3 mt-5">
      {topics ? (
        topics.map((topic: topic) => {
          return (
            <Card className="w-full">
              <CardHeader className="p-1">
                {topic.img && (
                  <Image
                    src={`${topic?.img}`}
                    alt=""
                    className="h-56 w-full object-cover rounded-xl"
                    width={500}
                    height={500}
                  />
                )}
                <CardTitle className="px-5 py-1">
                  <Link href={`/articles/add-article/${topic._id}`}>
                    {topic.title}
                  </Link>
                </CardTitle>
                <CardDescription className="px-5 py-1">
                  {topic.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="text-xs bottom-2">
                Author email : {topic.author}
                {pathName === "/articles/my-articles" && (
                  <Button
                    onClick={() => deleteArticle(topic._id)}
                    variant={"link"}
                    className="text-red-500 text-left"
                  >
                    <TrashIcon />
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })
      ) : (
        <div className="text-red-500 font-bold text-xl">no articles</div>
      )}
    </div>
  );
}
export default TopicsList;
