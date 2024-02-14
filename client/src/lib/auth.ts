//@ts-nocheck
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { DBConnection } from "./utils";
import { Users } from "./models";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

const login = async (credentials: any) => {
  try {
    DBConnection();
    const user = await Users.findOne({ username: credentials.username });
    if (!user) {
      throw new Error("Invalid Credentials or User not Found");
    }
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }
    return user;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          // console.log("CredProv", user.id);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider == "github") {
        DBConnection();
        try {
          const user = await Users.findOne({ email: profile?.email });
          if (!user) {
            const newUser = new Users({
              name: profile?.login,
              email: profile?.email,
              image: profile?.avatar_url,
              account_type: account?.provider,
            });
            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      // console.log(profile);
      return true;
    },
    ...authConfig.callbacks,
  },
});
