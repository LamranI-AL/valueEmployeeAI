// components/ArticleLayout.tsx
import { NavigationMenuDemo } from "@/components/nav-bar";
import { ReactNode, Suspense } from "react";
// import { Sidebar, Navbar } from "your-shadcn-components";
import "tailwindcss/tailwind.css";
import Loading from "./loading";

interface ArticleLayoutProps {
  children: ReactNode;
}

const ArticleLayout = ({ children }: ArticleLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavigationMenuDemo />
      <div className="flex flex-1">
        <main className="">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
};

export default ArticleLayout;
