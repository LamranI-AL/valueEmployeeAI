"use client";
import { addCommentAction, addDetails } from "@/actions/addComment";
import { Button } from "@/components/ui/button";
import { descriptionAiArticle } from "@/interfaces/Interface";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface Props {
  topic: {
    title: string;
    description: string;
    date: Date;
  };
}
function AiSlice({ topic }: Props) {
  const { data: session } = useSession();
  const [detailsDescription, setDetailsDescription] =
    useState<descriptionAiArticle>();
  const generatMoreDetails = async () => {
    const toasId = toast.loading(
      "Please wait a moment while we generate more details about this article...."
    );
    const finalPromptDetails = `Le titre de mon article est : '${topic.title}'. La description est : '${topic.description}'`;
    const descriptionFromAction = await addDetails(
      finalPromptDetails,
      session?.user?.name as string
    );
    alert("Article detailed and successfully generated.");
    toast.success("more description generated sucessfully");
    toast.dismiss(toasId);
    setDetailsDescription(
      descriptionFromAction.AIresult as descriptionAiArticle
    );
    let jsonString = descriptionFromAction.AIresult;
    try {
      const data: descriptionAiArticle = JSON.parse(jsonString);
      setDetailsDescription(data);
    } catch (error) {
      console.error("Erreur lors de l'analyse du JSON :", error);
    }
  };
  return (
    <div>
      <article className="rounded-xl p-4 shadow-sm m-2 sm:p-6 lg:p-8">
        <div className="flex items-start sm:gap-8">
          <div
            className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
            aria-hidden="true"
          >
            <div className="flex items-center gap-1">
              <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
            </div>
          </div>

          <div>
            <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
              AI prop
            </strong>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              <Button onClick={generatMoreDetails} variant={"link"}>
                <Link href="#" className="hover:underline">
                  {" "}
                  {topic.title}
                </Link>
              </Button>
            </h3>

            <p className="mt-1 text-sm text-gray-700">{topic.description}</p>

            <div className="mt-4 sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center gap-1 text-gray-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>

                {/* <p className="text-xs font-medium">{getDate()}</p> */}
              </div>
            </div>
          </div>
        </div>
      </article>
      {detailsDescription && (
        <section className="max-w-7xl  m-10 border border-gray-500 p-10 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4 border-b pb-4">
            {detailsDescription.article}
          </h1>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p className="leading-relaxed text-gray-800">
              {detailsDescription.details.overview}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold  mb-4">Concepts</h2>
            <ul className="space-y-4">
              {detailsDescription.details &&
                detailsDescription.details.concepts.map((concept, index) => (
                  <li key={index} className="p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold  mb-2">
                      {concept.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{concept.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-500">
                      {concept.examples &&
                        concept.examples.map((example, i) => (
                          <li key={i}>{example}</li>
                        ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Resources
            </h2>
            <ul className="space-y-4">
              {detailsDescription.details &&
                detailsDescription.details.resources.map((resource, index) => (
                  <li key={index} className="p-4  rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {resource.name}
                    </h3>
                    <p className="text-gray-600">{resource.type}</p>
                    <a
                      href={resource.lien}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.lien}
                    </a>
                    {resource.auteur && (
                      <p className="text-gray-500">Author: {resource.auteur}</p>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              How to Implement
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {detailsDescription.details.how_to}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default AiSlice;
