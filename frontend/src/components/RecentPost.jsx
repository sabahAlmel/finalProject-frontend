import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { fetchPostLimit } from "../db/fetchPost";

function RecentPost() {
  const [recentPosts, setRecentPosts] = useState(null);
  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetchPostLimit(16);
        if (res.status === 200) {
          setRecentPosts(res.data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <section className="flex flex-col justify-center items-center my-10">
      <h1 className="text-3xl mt-5 mb-5">Recent articles</h1>
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        {recentPosts &&
          recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </section>
  );
}

export default RecentPost;
