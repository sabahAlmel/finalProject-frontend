import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { fetchRecommendPostBySubCategory } from "../db/fetchPost";

function RecommendedActivity() {
  const [recentPosts, setRecentPosts] = useState(null);
  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetchRecommendPostBySubCategory("Activities", 4);
        if (res.status === 200) {
          setRecentPosts(res.data);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <section className="flex flex-col justify-center items-center my-10">
      <h1 className="text-3xl mt-5 mb-5">Recommended Activity</h1>
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        {recentPosts &&
          recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </section>
  );
}

export default RecommendedActivity;
