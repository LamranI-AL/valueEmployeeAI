import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const ContactPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-cyan-100 ">
          Contactez-me
        </h1>
        <form>
          <div className="mb-4">
            <Label
              htmlFor="subject"
              className="block text-gray-700 font-semibold mb-2 dark:text-gray-200"
            >
              Sujet
            </Label>
            <Input type="text" placeholder="Entrez le sujet" />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2 dark:text-gray-200"
            >
              Description
            </Label>
            <Textarea placeholder="Entrez la description" rows={5}></Textarea>
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
