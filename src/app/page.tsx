"use client";
import Hero from "@/_components/hero-section";
import Link from "next/link";

export default function Home() {
  // const settings = [
  //   { name: "profile", url: "/profile" },
  //   { name: "sign in", url: "/auth/signin" },
  //   { name: "chat", url: "/chat" },
  // ];
  return (
    <main className="">
      {/* from home page */}
      {/* <nav>
        <div className="flex flex-row justify-around gap-2">
          {settings.map((navItem) => {
            return (
              <Link
                href={navItem.url as string}
                className=" text-pink-300 hover:font-bold"
              >
                {navItem.name}
              </Link>
            );
          })}
        </div>
      </nav> */}
      <Hero />
    </main>
  );
}
