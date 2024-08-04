import Hero from "@/_components/hero-section";
import React from "react";

function page() {
  return (
    <Hero
      title="Welcome to my AI"
      titleRed="Oth-Ai articles"
      description="This phase of the application is dedicated to articles, meaning you can publish an article. There's also a section for AI, which can help you suggest articles similar to the ones you're writing."
    />
  );
}

export default page;
