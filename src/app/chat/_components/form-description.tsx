"use client";
import toast from "react-hot-toast";
import { useChat } from "ai/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import Card from "./card";
import { BotIcon, BotOff, Loader, PersonStandingIcon } from "lucide-react";
// import { descriptionSchema } from "@/schemas/descriptionSchema";
// import { useState } from "react";
import Markdown from "@/_components/markdown";

function FormInput() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/chat",
    });
  // const [inputUser, setInputUser] = useState("");
  // const addcomment = async (formData: FormData) => {
  //   const description = formData.get("description");
  //   const newInputObject = {
  //     description: description,
  //   };
  //   const result = descriptionSchema.safeParse(newInputObject);
  //   const inputText = description;
  //   const message = `J'ai un texte entre parenthèses. Tout d'abord, filtrez les mots de ce texte pour déterminer s'ils valorisent ou dévalorisent la personne. Ensuite, dites-moi si cette personne est bien ou non. Il s'agit d'un ouvrier et le texte est un commentaire d'un recruteur. Par exemple, le texte est : '${inputText}'. Vous pouvez simplement compter le nombre de mots négatifs et positifs. Si le nombre de mots négatifs est supérieur au nombre de mots positifs, cela signifie que cette personne a une mauvaise réputation dans l'entreprise. Dans le type de retour, je veux le texte, les mots négatifs, les mots positifs et le statut (bon ou mauvais) au format JSON.`;
  //   if (result.success) {
  //     const toasId = toast.loading("Waiting...");
  //     await addCommentAction(message)
  //       .then((res) => {
  //         toast.dismiss(toasId);
  //         toast.success("description ajouté avec succès");
  //       })
  //       .catch((er) => console.log(er));
  //     //   console.log(reslt);
  //   } else {
  //     toast.error(
  //       "Le texte n'est pas valide. Veuillez entrer un texte valide pour le traitement."
  //     );
  //   }
  //   // console.log()
  //   console.log(description);
  // };
  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log(event.currentTarget.value);
    // const result = await descriptionSchema.safeParse(event)
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
    // toast.dismiss(loaderID);
  };
  return (
    <div>
      <form /*action={addcomment}*/
        onSubmit={onSubmit}
        className="m-10 rounded-xl space-y-2 "
      >
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
                    } ${m.role === "user" && "text-indigo-800"}`}
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
