import Image from "next/image";
import styles from "./post.module.css";
import { Suspense } from "react";
import PostUser from "@/components/PostUser/postUser";
import Link from "next/link";
import { getPost } from "@/lib/data_api";
import { auth } from "@/lib/auth";

// export const metadata = {
//   title: "Blog",
//   description: "About description",
// };

export const generateMetadata = async ({ params }: PostProps) => {
  const post = await getPost(params.post);
  // here the question the getPost call made twice but the nextjs calls the function only once even with API calls ... nextjs caches the result and try to fetch the result by checking cache before doing API call
  return {
    title: post.title,
    description: post.body,
  };
};

type PostProps = {
  params: {
    post: string;
  };
};

// // Fetch with API
// const getData = async (post: any) => {
//   const res = await fetch(`http://localhost:3000/api/blog/${post}`);
//   if (!res.ok) {
//     throw new Error("Error fetching");
//   }
//   return res.json();
// };

export default async function Post({ params }: PostProps) {
  // const userId = "123";
  const post = await getPost(params.post);
  const session = await auth();
  // console.log(post);
  // const post = await getData(params.post);
  // const post = {
  //   img: "/demo.jpg",
  //   title: "Blog post title",
  //   body: "dxfcgvhbjhgvfcdfxfghksdbwgfvsdgjhfjbfuirfgaeugfbaegrtcfvgbhjnhfddtfcgvhbjnewrxctfvghbjbvfsxdfcgh",
  //   createdAt: "abcasdfwwsdgawdga",
  //   slug: "1234567890",
  //   id: 1,
  //   user: {
  //     img: "/user.png",
  //     username: "Pavan",
  //     id: "123",
  //   },
  // };
  // console.log(post);

  return (
    <div className={styles.container}>
      {post?.image && (
        <div className={styles.imgContainer}>
          <Image src={post?.image} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post?.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post?.createdAt.toString().slice(4, 16)}
            </span>
          </div>
          {session?.user?.id === post?.userId.toString() && (
            // <div className={styles.button}>
            <Link href={`/blog/${post?.id}/edit`} className={styles.button}>
              <Image src="/edit.svg" alt="edit" width={24} height={24} />
              Edit Post?
            </Link>
            // </div>
          )}
        </div>
        <div className={styles.content}>{post?.body}</div>
      </div>
    </div>
  );
}
