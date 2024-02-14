"use client";
import { useState } from "react";
import BlogSearch from "./BlogSearch";

type PostProps = {
  img: string;
  title: string;
  body: string;
  createdAt: string;
  slug: string;
  id: number;
  user: {
    img: string;
    username: string;
  };
};

type SearchMainProps = {
  posts: PostProps[];
};

export default function SearchMain({ posts }: SearchMainProps) {
  const [filteredBlogs, setFilteredBlogs] = useState(posts);
  const handleSearch = (searchTerm: string) => {
    // Implement your search logic here
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };
  return <BlogSearch onSearch={handleSearch} />;
}
