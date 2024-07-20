import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 days LI ghayeb9a had token avalable
  },
  jwt: {
    //for decodez same jwt for getting same infos  ; about user for exemple
  },
  callbacks: {
    //if i wana do same think after singIN or after user section ...
  },
  secret: process.env.NEXTAUTH_SECRET,
};
