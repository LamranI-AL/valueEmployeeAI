import React, { Suspense } from "react";
import FiltredArticles from "../components/FiltredArticles";
import Loading from "../loading";

function page() {
  return (
    <Suspense fallback={<Loading />}>
      <FiltredArticles />
    </Suspense>
  );
}

export default page;
