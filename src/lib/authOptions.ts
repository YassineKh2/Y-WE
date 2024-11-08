import { Account, User as AuthUser, NextAuthOptions } from "next-auth";
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

        let { email, name, image, _id, role } = user.toObject();
        let id = _id.toString();

        return {
          id: id,
          email: email,
          name: name,
          image: image,
          role: role,
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
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
    signIn: async ({
      user,
      account,
    }: {
      user: AuthUser;
      account: Account | null;
    }): Promise<boolean> => {
      if (account?.provider === "credentials") {
        return true;
      }
      if (account?.provider === "google") {
        try {
          await connectMongoDB();
          const existingUser = await User.findOne({ email: user?.email });
          if (!existingUser) {
            let data = {
              name: user.name,
              email: user.email,
              image: user.image,
              password: "",
            };
            const randomPassword = require("crypto")
              .randomBytes(16)
              .toString("hex");
            const bcrypt = require("bcrypt");
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            data = { ...data, password: hashedPassword };
            await User.create(data);
            return true;
          }

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
