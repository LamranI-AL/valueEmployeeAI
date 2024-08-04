import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Oth-AI -chat",
  description:
    "An AI-powered chatbot developed by Othmane Lamrani Alaoui, a student at the National School of Applied Sciences in Beni Mellal, designed to meet the needs of students and employees. This chatbot aims to facilitate research for students.",
};

export default function Chatlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
