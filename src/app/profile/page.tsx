import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { authOptions } from "../../lib/nextAuth";
import ButtonSignIn from "../../_components/ButtonSignIn";
import Link from "next/link";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.name);
  return (
    <div>
      {session ? (
        <>
          <h1 className="text-center text-2xl font-bold font-serif shadow-sm">
            Welcome, {session?.user?.name}!
          </h1>
          <Image
            src={
              session
                ? (session?.user?.image as string)
                : "https://via.placeholder.com/150"
            }
            alt={""}
            width={100}
            height={100}
            className="rounded-full"
          />
          <ButtonSignIn ButtonName="sign out" />
        </>
      ) : (
        <>
          <h1 className="text-center text-2xl font-bold font-serif shadow-sm">
            sign in to show u profile
          </h1>
          <ButtonSignIn ButtonName="sign in" />
        </>
      )}
      <Link href={"/"}>
        <button className="p-5">home</button>
      </Link>
    </div>
  );
};

export default Profile;
