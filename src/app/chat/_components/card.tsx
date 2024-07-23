import React from "react";

function Card({ message }: { message: { content: string; role: string } }) {
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
      <div className="bg-white p-4 sm:p-6">
        <a href="#">
          <h3 className="mt-0.5 text-lg ">
            {message.role === "user" ? "You" : message.role === "bot"}{" "}
          </h3>
        </a>

        <p className="mt-2 line-clamp-3 text-sm/relaxed ">{message.content}</p>
      </div>
    </article>
  );
}

export default Card;
