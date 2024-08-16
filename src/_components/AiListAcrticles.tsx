"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { description, topic } from "@/interfaces/Interface";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AiSlice from "./Ai-slice";

type Props = {
  id: string;
};

function AiListAcrticles({ id }: Props) {
  const [articles, setArticles] = useState<description>();
  const [topic, setTopic] = useState<topic>();

  useEffect(() => {
    const getAiArticiles = async () => {
      // getArticle :
      const res = await fetch(`/api/topics/${id}`);
      const data = await res.json();
      const topic: topic = data.topic;
      setTopic(topic);
      // get ALL articles
      const response = await fetch(`/api/description`);
      const AllArticles: description[] = await response.json();
      const articleByIdSearched =
        AllArticles.filter((article) => {
          return article.topicCustomId === topic?.customId;
        }) || {};
      setArticles(articleByIdSearched[0]);
    };
    getAiArticiles();
  }, []);
  let ArrayArticles;
  try {
    ArrayArticles = JSON.parse(articles?.AIresult as string);
  } catch (error) {
    console.error("Erreur lors de l'analyse du JSON :", error);
  }
  return (
    <div>
      {topic && (
        <Card className="w-full ">
          <CardHeader className="p-1">
            {topic?.img && (
              <Image
                src={`${topic?.img}`}
                alt=""
                className="h-56 w-full object-cover rounded-xl"
                width={500}
                height={500}
              />
            )}
            <CardTitle className="px-5 py-1">
              <Link href={`/chat/articles/add-article/${topic?._id}`}>
                {topic?.title}
              </Link>
            </CardTitle>
            <CardDescription className="px-5 py-1">
              {topic?.description}
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      <h1 className="font-bold text-cyan-800 dark:text-cyan-500">
        Suggestions de l'IA :{" "}
      </h1>
      {Array.isArray(ArrayArticles)
        ? ArrayArticles.map((article, index) => (
            <AiSlice key={index} topic={article} />
          ))
        : "loading..."}
    </div>
  );
}

export default AiListAcrticles;
