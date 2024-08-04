import Link from "next/link";
import React from "react";
interface Props {
  title: string;
  titleRed: string;
  description: string;
}
function Hero({ title, description, titleRed }: Props) {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            {title}
            <strong className="font-extrabold text-red-700 sm:block">
              {" "}
              {titleRed}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">{description}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href={
                title === "Welcome to my chat"
                  ? "/chat"
                  : "/chat/articles/add-article"
              }
              // href="/chat"
            >
              Get Started
            </Link>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="/chat/contact"
            >
              Contact-me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
