import React from "react";
import markdawnit from "markdown-it";

type Props = {
  text: string;
};
const markdawn = markdawnit();

const Markdown = ({ text }: Props) => {
  const htmlContent = markdawn.render(text);
  //   console.log(htmlContent);
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
};

export default Markdown;
