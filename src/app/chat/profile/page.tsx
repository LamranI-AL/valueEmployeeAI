import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../../lib/nextAuth";
import ButtonSignIn from "../../../_components/ButtonSignIn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.name);
  return (
    <div>
      {session ? (
        <div>
          <div className="flex justify-center space-x-4 m-5">
            <Avatar>
              <AvatarImage src={session?.user?.image as string} />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@{session?.user?.name} </h4>
              <p className="text-sm">
                Mr. {session?.user?.name?.toUpperCase()}! We are delighted to
                have you in the Oth-Chat app
              </p>
              <div className="flex items-center pt-2">
                <User className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  {session?.user?.email}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="relative block overflow-hidden lg:m-20 dark:bg-slate-950 rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

              <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100  sm:text-xl">
                    Mr. {session?.user?.name?.toUpperCase()}!
                  </h3>

                  <p className="mt-1 text-xs font-medium text-gray-600">
                    {session?.user?.email}
                  </p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                  <img
                    alt=""
                    src={session?.user?.image as string}
                    className="size-16 rounded-lg object-cover shadow-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-pretty text-sm text-gray-500">
                  Welcome, Mr. {session?.user?.name?.toUpperCase()}! We are
                  thrilled to have you join us on the Oth-Chat app. Your
                  presence enriches our community, and we are excited to support
                  you as you explore all the features and opportunities this
                  platform has to offer. If you need any assistance or have any
                  questions, our team is here to help. Enjoy your experience
                  with us!
                </p>
              </div>

              <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">
                    Published
                  </dt>
                  {/* <dd className="text-xs text-gray-500">31st June, 2021</dd> */}
                </div>

                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">
                    Reading time
                  </dt>
                  {/* <dd className="text-xs text-gray-500">3 minute</dd> */}
                </div>
              </dl>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-center text-2xl font-bold font-serif shadow-sm">
            sign in to show u profile
          </h1>
          <ButtonSignIn ButtonName="sign in" />
        </>
      )}
    </div>
  );
};

export default Profile;
