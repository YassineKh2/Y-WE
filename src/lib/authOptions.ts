import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "@/lib/MongodbClient";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectMongoDB();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          throw new Error("Credentials does not match");
        }

        const bcrypt = require("bcrypt");
        const validPassword = await bcrypt.compare(
          credentials?.password,
          user.password,
        );

        if (!validPassword) {
          throw new Error("Credentials does not match");
        }

        let { email, name, image, _id } = user.toObject();
        let id = _id.toString();

        return {
          id: id,
          email: email,
          name: name,
          image: image,
        } as any;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      if (token) {
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    },
  },
};
