"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
// import { ModeToggle } from "./mode-toggle";
import { useSession } from "next-auth/react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "My articles",
    href: "/articles/my-articles",
    description: "Show your personal articles and manage them",
  },
  {
    title: "Add article",
    href: "/articles/add-article",
    description:
      "Add an article to help others learn from your content and gain insights.",
  },
];
export function NavigationMenuDemo() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex my-1 justify-center gap-10 ">
      <div className="">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger> All articles</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-3 w-[400px] ">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/articles"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          All articles
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Display all articles created by other users and
                          explore how others think.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>article</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-3 md:w-[400px] md:grid-cols-2 ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <Link href="/chat" legacyBehavior passHref>
                {session !== null ? (
                  <Avatar>
                    <AvatarImage
                      src={session?.user?.image as string}
                      alt="@shadcn"
                    />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>
                ) : (
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    login
                  </NavigationMenuLink>
                )}
              </Link>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* <div className="mx-2 ">
        <ModeToggle />
      </div> */}
    </div>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
