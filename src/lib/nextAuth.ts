import { connectTodb } from "@/db/connectTodb";
import UserModel from "@/models/UserModel";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
//bcript importation
import bcrypt from "bcryptjs";
export const authOptions: AuthOptions = {
  // Configure more authentication providers
  providers: [
    // Credentials(),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectTodb();
        try {
          const user = await UserModel.findOne({ email: credentials.email });
          if (user) {
            const isCorrectPassword = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isCorrectPassword) {
              return user;
            }
          }
        } catch (error) {
          throw new Error(error as string);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
