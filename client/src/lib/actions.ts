"use server";

import { revalidatePath } from "next/cache";
import { Posts, Users } from "./models";
import { DBConnection } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

export const actionsExample = async () => {
  "use server";
  // use server makes this function a server side function (server actions) ... this will help like a server side function can be used with client side component (my intution)
  // And this function must be asynchronous function even it doesn't return anything asynchronously
  console.log("Example for server actions");
};

export const createPostAction = async (prevState: any, PostData: any) => {
  "use server";
  const { title, body, image, slug, userId } = Object.fromEntries(PostData);
  //   const updated_userId = stringToObjectId(userId);
  //   console.log(updated_userId);
  try {
    DBConnection();
    const newPost = new Posts({
      title,
      body,
      image,
      slug,
      userId,
    });
    await newPost.save();
    console.log("Success");
    revalidatePath("/blog"); // since caching is there for the posts therefore the posts under blog page doesnot reloads or refetching occurs so revalidatepath is added to refetch and cache at same time
    revalidatePath("/admin");
  } catch (err: any) {
    console.log(err);
    return { error: err.message };
  }
};

export const deletePostAction = async (PostData: any) => {
  "use server";
  const { postId } = Object.fromEntries(PostData);
  try {
    DBConnection();
    await Posts.findByIdAndDelete(postId);
    console.log("Success");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err: any) {
    console.log(err);
    return { err: err.message };
  }
};

// function stringToObjectId(str: string) {
//   const hexString = Buffer.from(str).toString("hex");
//   const objectIdLike = {
//     _bsontype: "ObjectId",
//     id: Buffer.from(hexString, "hex"),
//   };

//   return objectIdLike;
// }

export const addUser = async (prevState: any, formData: any) => {
  const { username, name, email, password, image, isAdmin } =
    Object.fromEntries(formData);

  try {
    DBConnection();
    const newUser = new Users({
      username,
      name,
      email,
      password,
      image,
      isAdmin,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData: any) => {
  const { id } = Object.fromEntries(formData);

  try {
    DBConnection();

    await Posts.deleteMany({ userId: id });
    await Users.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleGithubLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState: any, formData: any) => {
  "use server";
  const { username, name, email, password, image, confirm_password } =
    Object.fromEntries(formData);

  if (password !== confirm_password) {
    return { error: "Passwords do not match" };
  }

  try {
    DBConnection();

    const user = await Users.findOne({ username });

    if (user) {
      return { error: "User already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
      username,
      name,
      image,
      email,
      account_type: "credentials",
      password: hashedPassword,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err: any) {
    console.log(err);
    return { error: err.message };
  }
};

export const login = async (prevState: any, formData: any) => {
  const { email, username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, username, password });
  } catch (err: any) {
    // console.log("first");
    // console.log(err);
    // if (err) {
    //   switch (err.type) {
    //     case "CredentialsSignin":
    //       return { error: "Invalid username or password" };
    //     default:
    //       return { error: "Something went wrong." };
    //   }
    // }
    if (err.type == "CredentialsSignin") {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};

//{// // Protecting Server Actions(app/lib/actions.ts)
// // example from nextjs docs to check authorization
// export async function serverAction() {
//   'use server'
//   const session = await getSession()
//   const userRole = session?.user?.role

//   // Check if user is authorized to perform the action
//   if (userRole !== 'admin') {
//     throw new Error('Unauthorized access: User does not have admin privileges.')
//   }

//   // Proceed with the action for authorized users
//   // ... implementation of the action
// }

// // Protecting Route Handlers (app/api/route.ts)
// export async function GET() {
//   // User authentication and role verification
//   const session = await getSession()

//   // Check if the user is authenticated
//   if (!session) {
//     return new Response(null, { status: 401 }) // User is not authenticated
//   }

//   // Check if the user has the 'admin' role
//   if (session.user.role !== 'admin') {
//     return new Response(null, { status: 403 }) // User is authenticated but does not have the right permissions
//   }

//   // Data fetching for authorized users
// }

// Authorization Using Server Components(app/dashboard/page.tsx)
// export default function Dashboard() {
//   const session = await getSession()
//   const userRole = session?.user?.role // Assuming 'role' is part of the session object

//   if (userRole === 'admin') {
//     return <AdminDashboard /> // Component for admin users
//   } else if (userRole === 'user') {
//     return <UserDashboard /> // Component for regular users
//   } else {
//     return <AccessDenied /> // Component shown for unauthorized access
//   }
// }

// // Session Management
// // Cookie-Based Sessions
// //app/actions.ts

// import { cookies } from 'next/headers'

// export async function handleLogin(sessionData) {
//   'use server'
//   const encryptedSessionData = encrypt(sessionData) // Encrypt your session data
//   cookies().set('session', encryptedSessionData, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 60 * 60 * 24 * 7, // One week
//     path: '/',
//   })
//   // Redirect or handle the response after setting the cookie
// }
// // app/page.tsx
// import { cookies } from 'next/headers'

// export async function getSessionData(req) {
//   const encryptedSessionData = cookies().get('session')?.value
//   return encryptedSessionData ? JSON.parse(decrypt(encryptedSessionData)) : null
// }

// // Database Sessions

// // Database session management involves storing session data on the server, with the user's browser only receiving a session ID. This ID references the session data stored server-side, without containing the data itself. This method enhances security, as it keeps sensitive session data away from the client-side environment, reducing the risk of exposure to client-side attacks. Database sessions are also more scalable, accommodating larger data storage needs.

// // However, this approach has its tradeoffs. It can increase performance overhead due to the need for database lookups at each user interaction. Strategies like session data caching can help mitigate this. Additionally, reliance on the database means that session management is as reliable as the database's performance and availability.

// // Here's a simplified example of implementing database sessions in a Next.js application:

// // Creating a Session on the Server:

// import db from './lib/db'

// export async function createSession(user) {
//   const sessionId = generateSessionId() // Generate a unique session ID
//   await db.insertSession({ sessionId, userId: user.id, createdAt: new Date() })
//   return sessionId
// }
// // Retrieving a Session in Middleware or Server-Side Logic:

// import { cookies } from 'next/headers'
// import db from './lib/db'

// export async function getSession() {
//   const sessionId = cookies().get('sessionId')?.value
//   return sessionId ? await db.findSession(sessionId) : null
// }
//}
