import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { getUser } from "@/lib/data_api";

export default async function Card({ post }: any) {
  const user = await getUser(post.userId);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {post.image && (
          <div className={styles.imgContainer}>
            <Image
              src={post.image}
              alt=""
              width={200}
              height={100}
              className={styles.img}
            />
          </div>
        )}
        <span className={styles.date}>
          {post.createdAt?.toString().slice(4, 16)}
        </span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.content}>
          <p className={styles.desc}>{post.body}</p>
          <Link className={styles.link} href={`/blog/${post.slug}`}>
            Read More
          </Link>
        </div>
        <div className={styles.sub_bottom}>
          <div className={styles.user_info}>
            <Image
              src={user?.image ? user?.image : "/user.png"}
              alt="user"
              width={0}
              height={0}
              className={styles.userimage}
            />
            <span>
              <Link href={`/users/${user?.id}`}>{user?.username}</Link>
            </span>
            {/* <span>{post.user.username.split(" ")[0]}</span> */}
          </div>
          <Image
            src="/share.svg"
            alt="share"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
