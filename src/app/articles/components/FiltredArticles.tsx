"use client";
import React, { Suspense, useEffect, useState } from "react";
import TopicsList from "@/_components/topics-list";
import { topic } from "./AllListArticls";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import Form from "@/_components/form";
function FiltredArticles() {
  const { data: session } = useSession();
  const [topics, setTopics] = useState<topic[] | any[]>([]);
  useEffect(() => {
    const getTopics = async () => {
      const response = await fetch("/api/topics", {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const topics: topic[] = data.data;
      const filtredTobicsByAuthor = topics.filter(
        (topic) => topic.author === session?.user?.email
      );
      setTopics(filtredTobicsByAuthor);
    };
    getTopics();
  }, [session?.user?.email]);
  return (
    <>
      <Form />
      <Suspense fallback={<Loading />}>
        {topics.length !== 0 && <TopicsList topics={topics} />}
      </Suspense>
    </>
  );
}

export default FiltredArticles;
