import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Welcome to my chat
            <strong className="font-extrabold text-red-700 sm:block">
              {" "}
              Oth-Ai Chat
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            This chatbot is here to assist you with any questions you might
            have. Feel free to ask anything, and enjoy your experience!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/chat"
            >
              Get Started
            </Link>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="/contact"
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
