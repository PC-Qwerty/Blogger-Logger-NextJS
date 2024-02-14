import styles from "./adminPosts.module.css";
import Image from "next/image";
import { getPosts } from "@/lib/data_api";
import { deletePostAction } from "@/lib/actions";

const AdminPosts = async () => {
  const posts = await getPosts();
  const deletePostWithId = ({ id }: any) => {
    return deletePostAction.bind(null, id);
  };

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <>
          <div className={styles.post} key={post.id}>
            <div className={styles.detail}>
              <Image
                src={post.image || "/user.png"}
                alt=""
                width={50}
                height={50}
                className={styles.userimage}
              />
              <span className={styles.postTitle}>{post.title}</span>
            </div>
            {/* <form action={deletePostWithId}> */}
            <form action={deletePostAction}>
              <input type="hidden" name="postId" value={post.id} />
              <button className={styles.postButton}>Delete</button>
            </form>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
};

export default AdminPosts;
