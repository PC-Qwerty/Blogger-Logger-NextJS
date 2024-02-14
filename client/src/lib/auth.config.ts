import { Session } from "next-auth";
import { NextRequest } from "next/server";

// type authConfigProps = { request: NextRequest; auth: Session | null };
type authConfigProps = { request: any; auth: any };

type jwtProps = {
  token: any;
  //   token: {
  //     id: string;
  //     isAdmin: boolean;
  //   };
  user: any;
};
type sessionProps = {
  session: any;
  token: any;
};

export const authConfig = {
  pages: {
    // this is called only when the authorized() returns false that is when user is not authenticated or user  is not admin
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }: jwtProps) {
      // console.log("user", user);
      // const { isAdmin, email, ...otherDetails } = user?._doc;
      // console.log(isAdmin, email);
      if (user) {
        token.id = user.id;
        token.isAdmin = user._doc.isAdmin;
        token.email = user._doc.email;
        token.name = user._doc.name;
      }
      return token;
    },
    async session({ session, token }: sessionProps) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
    authorized({ auth, request }: authConfigProps) {
      // here the "return false" does is that for any page that is to be opened it makes the authorized() returns false
      // this makes callback to the "pages" in the above
      //   return false;

      // console.log(auth);
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }
      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
      if (isOnBlogPage && !user) {
        return false;
      }
      // ONLY AUTHENTICATED USERS CAN REACH THE LOGIN PAGE
      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
      //   return true;
    },
  },
};
