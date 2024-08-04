"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export interface topic {
  _id: string;
  title: string;
  description: string;
  img: string;
}
function TopicsList() {
  const [topics, setTopics] = useState<topic | any>([]);
  const getTopics = async () => {
    const response = await fetch("/api/topics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTopics(data.data);
  };
  useEffect(() => {
    getTopics();
  }, []);
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
                <CardTitle className="px-5 py-1">{topic.title}</CardTitle>
                <CardDescription className="px-5 py-1">
                  {topic.description}
                </CardDescription>
              </CardHeader>
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
