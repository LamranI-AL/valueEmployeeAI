"use client";
import React, { useEffect, useState } from "react";
import TopicsList from "@/_components/topics-list";
export interface topic {
  _id: string;
  title: string;
  description: string;
  img: string;
  customId: string;
  author: string;
}
type Props = {};
function AllListArticls({}: Props) {
  const [topics, setTopics] = useState<topic[] | any>([]);
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
      setTopics(topics);
    };
    getTopics();
  }, []);
  return <TopicsList topics={topics} />;
}
export default AllListArticls;
