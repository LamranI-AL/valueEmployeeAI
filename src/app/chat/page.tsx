"use client";
import { descriptionSchema } from "@/schemas/descriptionSchema";
import { addCommentAction } from "@/actions/addComment";
import { useState } from "react";
import toast from "react-hot-toast";
// import { AiObject } from "@/interfaces/Interface";
function page() {
  // const [data, setData] = useState<any>();
  const addcomment = async (formData: FormData) => {
    const description = formData.get("description");
    const newInputObject = {
      description: description,
    };
    const result = descriptionSchema.safeParse(newInputObject);
    const inputText = description;
    const message = `J'ai un texte entre parenthèses. Tout d'abord, filtrez les mots de ce texte pour déterminer s'ils valorisent ou dévalorisent la personne. Ensuite, dites-moi si cette personne est bien ou non. Il s'agit d'un ouvrier et le texte est un commentaire d'un recruteur. Par exemple, le texte est : '${inputText}'. Vous pouvez simplement compter le nombre de mots négatifs et positifs. Si le nombre de mots négatifs est supérieur au nombre de mots positifs, cela signifie que cette personne a une mauvaise réputation dans l'entreprise. Dans le type de retour, je veux le texte, les mots négatifs, les mots positifs et le statut (bon ou mauvais) au format JSON.`;
    if (result.success) {
      toast.success("description ajouté avec succès");
      const toasId = toast.loading("Waiting...");
      console.log(result.data);
      await addCommentAction(message);
      // console.log(AIgenerator);
      // console.log(typeof AIgenerator);
      // setData(AIgenerator);
      toast.dismiss(toasId);
    } else {
      console.log(result.error);
      toast.error(
        "Le texte n'est pas valide. Veuillez entrer un texte valide pour le traitement."
      );
    }
    console.log(description);
  };
  return (
    <form action={addcomment} className="m-10 rounded-xl space-y-2">
      <label htmlFor="OrderNotes" className="text-gray-200 m-1">
        Description de personnes
      </label>

      <div className="overflow-hidden">
        <textarea
          id="OrderNotes"
          name="description"
          className="w-full resize-none p-5 border-x-0 border-t-0 border-gray-200  align-top sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          rows={6}
          placeholder="Enter any description of personne..."
        ></textarea>

        <div className="flex items-center justify-end gap-2 py-3">
          <button
            type="button"
            className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-100"
          >
            Clear
          </button>

          <button
            type="submit"
            className="rounded bg-slate-400 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
          >
            generate
          </button>
        </div>
      </div>
    </form>
    // <div className="">{data && data.text} </div>
    // </div>
  );
}

export default page;
