"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
interface Props {
  ButtonName: string;
}
export default function ButtonSignIn({ ButtonName }: Props) {
  const { data, status } = useSession();
  const handelClick = () => {
    console.log(data);
    if (status === "loading") {
      signIn("google");
    } else if (status === "authenticated") {
      console.log("u are authenticated");
      signOut();
    } else {
      signIn("google");

      console.log("u are unauthenticated");
    }
  };
  return (
    <button
      className="bg-slate-500 rounded-3xl p-3 justify-center text-center text-slate-200 m-4"
      onClick={handelClick}
    >
      {ButtonName}
    </button>
  );
}
