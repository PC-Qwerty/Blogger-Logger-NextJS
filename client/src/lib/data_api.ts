import { dummydata } from "./dummydata";
import { Posts, Users } from "./models";
import { DBConnection } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

export const getPosts = async () => {
  // return dummydata;
  await DBConnection();
  try {
    const posts = await Posts.find();
    return posts;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const getPost = async (id: string) => {
  // return dummydata.find((post) => post.id.toString() === id);
  await DBConnection();
  try {
    const post = await Posts.findOne({ slug: id });
    return post;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const getUser = async (id: string) => {
  // const post = dummydata.find((post) => post.user.id === id);
  // return post?.user;
  noStore();
  await DBConnection();
  try {
    const user = await Users.findById(id);
    return user;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const getUsers = async () => {
  await DBConnection();
  try {
    const users = await Users.find();
    return users;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};
