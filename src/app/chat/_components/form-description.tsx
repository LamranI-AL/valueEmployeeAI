"use client";
import toast from "react-hot-toast";
import { useChat } from "ai/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BotIcon, Loader, PersonStandingIcon } from "lucide-react";
import Markdown from "@/_components/markdown";
import { useState } from "react";
import { createMessages } from "@/services/GetMessages";
import { AIMessages } from "@/interfaces/Interface";

function FormInput() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/chat",
    });
  const [nbrSending, setNbrSending] = useState<number>(0);
  const onSubmit = async (event: any) => {
    event.preventDefault();
    setNbrSending(nbrSending + 1);
    console.log(nbrSending);
    if (nbrSending === 0) {
      //create messages
      // await createMessages(messages as AIMessages).then(() => {
      //   console.log("creat ok ");
      // });
    } else if (nbrSending > 0) {
      //updating messages
      console.log("pass");
    }
    // console.log(event.currentTarget.value);
    const loaderID = toast.loading("wait for generate");
    handleSubmit(event, {
      data: {
        prompt: input,
      },
    });
    if (!isLoading) {
      toast.success("message sent");
      toast.dismiss(loaderID);
    }
    console.log(messages);
    console.log(typeof messages);
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="m-10 rounded-xl space-y-2 ">
        <label htmlFor="OrderNotes" className="m-1">
          Input
        </label>
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder={`${
            !isLoading ? "Type your message here to AI" : "waiting"
          }`}
        />
        <Button type="submit" className="w-full">
          {!isLoading ? (
            "generate"
          ) : (
            <Loader className="animate-spin" onClick={stop} />
          )}
        </Button>
      </form>
      <div className="flex flex-col-reverse">
        {messages &&
          messages.map((m, index) => (
            <div key={m.id}>
              <article
                className={`overflow-hidden rounded-lg m-1 shadow-sm transition hover:shadow-xl`}
              >
                <div className="m-1 flex p-2 mx-4 ">
                  <h3 className="mt-0.5 text-sm">
                    {m.role === "user" ? (
                      <PersonStandingIcon />
                    ) : (
                      <BotIcon
                        className={`${
                          isLoading && index === messages.length - 1
                            ? "animate-bounce m-1"
                            : "animate-none"
                        }`}
                      />
                    )}{" "}
                  </h3>

                  <p
                    className={`mx-5 rounded-sm w-full  ${
                      m.role === "user"
                        ? "border italic font-bold py-1 px-4  border-slate-800 bg"
                        : ""
                    } ${
                      m.role === "user" &&
                      "text-slate-800 dark:text-slate-300 rounded-2xl text-end"
                    }`}
                  >
                    {/* {m.content} */}
                    <Markdown text={m.content} />
                  </p>
                </div>
              </article>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FormInput;
