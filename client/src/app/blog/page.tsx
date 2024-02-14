import Card from "@/components/Card/Card";
import styles from "./blog.module.css";
import BlogSearch from "@/components/BlogSearch/BlogSearch";
import SearchMain from "@/components/BlogSearch/SearchMain";
import { getPosts } from "@/lib/data_api";

// // Fetch with API
// const getData = async () => {
//   const res = await fetch("http://localhost:3000/api/blog", {
//     cache: "no-cache",
//     next: {
//       revalidate: 100,
//     },
//   });
//   if (!res.ok) {
//     throw new Error("Error fetching");
//   }
//   return res.json();
// };

export const metadata = {
  title: "Blogs",
  description: "Blogs description",
};

export default async function Blogs() {
  // fetch without API
  const posts = await getPosts();

  // fetch with API
  // const posts = await getData();

  return (
    <div className={styles.container}>
      <div className={styles.searchbar}>
        <SearchMain posts={posts} />
      </div>
      <div className={styles.blogcontainer}>
        {posts?.map((post) => (
          <div className={styles.post} key={post.id}>
            <Card post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
