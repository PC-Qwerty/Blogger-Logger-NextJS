// here this middlefare file is used to set rules such as admin page only allowwed to visit by admin and only authorized ? logined users can view blogs aand like thet ...
// of course this can be done with help of some conditions like " auth?.userr && push('/)" when user logged in like these and these are to be set in the appropraite page files like here login page but for the better approach nextjs middlewares are used with server sctions to set rules

// here the config object is used to filter with help of matcher -> regular expression
// mathcer allows to filter middleware to run on specific paths .. if not add any matcher ,middleware will be invoked on every route in the project
// and the rules mentioned are to be in auth.ts
// the rule (authorized()) if used in auth.ts directly it doesnot work because the file auth.ts uses NODEJS libraries (bcrypt , monngoose) but the MIDDLEWARE IS INDEPENDENT ON NODEJS LIBRARIES AND SO THE AUTHORIZED() IS USED IN SOME OTHER FILE AND CALLING THAT INDIRECTLY

import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
//@ts-ignore
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

// from NEXTJS Documentation
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const currentUser = request.cookies.get('currentUser')?.value

//   if (currentUser) {
//     return NextResponse.redirect(new URL('/dashboard', request.url))
//   }
//   return NextResponse.redirect(new URL('/login', request.url))
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }
