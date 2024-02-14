import { Posts } from "@/lib/models";
import { DBConnection } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
  try {
    DBConnection();
    const posts = await Posts.find();
    // console.log(posts);
    return NextResponse.json(posts);
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};
