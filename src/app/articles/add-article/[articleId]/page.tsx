import AiListAcrticles from "@/_components/AiListAcrticles";
import React, { Suspense } from "react";
import Loading from "../../loading";
type Props = {
  params: {
    articleId: string;
  };
};
function page({ params }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <AiListAcrticles id={params.articleId} />{" "}
    </Suspense>
  );
}
export default page;
