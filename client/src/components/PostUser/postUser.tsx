import Image from "next/image";
import styles from "./postuser.module.css";
import { getUser } from "@/lib/data_api";
import Link from "next/link";

type PostUserProps = {
  userId: string;
};

export default async function PostUser({ userId }: PostUserProps) {
  const user = await getUser(userId);
  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user?.image ? user?.image : "/user.png"}
        alt=""
        width={50}
        height={50}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>
          <Link href={`/users/${user?.id}`}>{user?.username}</Link>
        </span>
      </div>
    </div>
  );
}
