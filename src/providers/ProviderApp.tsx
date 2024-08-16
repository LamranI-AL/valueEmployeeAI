"use client";
import Link from "next/link";
import {
  Archive,
  Bot,
  BotOff,
  Contact,
  Home,
  LogOut,
  PackagePlus,
  PackageSearchIcon,
  User,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

function ProviderApp({ children }: Props) {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/chat") {
      document.title = "Oth-AI - Chat";
    } else if (pathname === "/chat/archive") {
      document.title = "Oth-AI - archive";
    } else if (pathname === "/chat/profile") {
      document.title = "Oth-AI - profile";
    } else if (pathname === "/chat/contact") {
      document.title = "Oth-AI - contact";
    } else if (pathname === "/chat/articles/add-article") {
      document.title = "Oth-AI - Articles";
    }
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <BotOff className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/chat"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname === "/chat" ? "bg-accent" : ""
                  } text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Bot className="h-5 w-5" />
                  <span className="sr-only">BOT</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Chat</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/articles"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname === "/chat/articles/add-article" ? "bg-accent" : ""
                  } text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <PackageSearchIcon className="h-5 w-5" />
                  <span className="sr-only">articles</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">articles</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/chat/contact"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname === "/chat/contact" ? "bg-accent" : ""
                  } text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Contact className="h-5 w-5" />
                  <span className="sr-only">contact</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">contact</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ModeToggle />
                  <span className="sr-only">toggle</span>
                </div>
              </TooltipTrigger>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                  <Button variant={"link"} onClick={() => signOut()}>
                    <LogOut className="h-5 w-5" />
                  </Button>

                  <span className="sr-only">LogOut</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">LogOut</TooltipContent>
            </Tooltip>
          </nav>
        </TooltipProvider>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">{children}</div>
    </div>
  );
}

export default ProviderApp;
