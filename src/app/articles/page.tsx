// import Hero from "@/_components/hero-section";
// import { PlusCircle, PlusSquare } from "lucide-react";
// import Link from "next/link";
import React from "react";
import AllListArticls from "./components/AllListArticls";
// import { Button } from "@/components/ui/button";
import { NavigationMenuDemo } from "@/components/nav-bar";

function page() {
  return (
    <div>
      {/* <NavigationMenuDemo /> */}
      <AllListArticls />
    </div>
  );
}

export default page;
