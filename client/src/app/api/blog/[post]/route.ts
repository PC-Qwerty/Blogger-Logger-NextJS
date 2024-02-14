import { Posts } from "@/lib/models";
import { DBConnection } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req: any, { params }: any) => {
  const { post } = params;
  try {
    DBConnection();
    const post_data = await Posts.findOne({ slug: post });
    // console.log(post_data);
    return NextResponse.json(post_data);
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};

// export const DELETE = async (req: any, { params }: any) => {
//     const { post } = params;
//     try {
//       DBConnection();
//       await Posts.deleteOne({ slug: post });
//       // console.log(post_data);
//       return NextResponse.json("Post Deleted");
//     } catch (err: any) {
//       console.log(err);
//       throw new Error(err.message);
//     }
//   };
