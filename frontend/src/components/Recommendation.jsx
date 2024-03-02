import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { fetchMostRecommendPost } from "../db/fetchPost";
import Slider from "react-slick";

function Recommendation() {
  const [recentPosts, setRecentPosts] = useState(null);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetchMostRecommendPost(10);
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
      <h1 className="text-3xl mt-5 mb-10">Recommended</h1>
      <Slider {...settings} style={{ width: "83%", height: "370px" }}>
        {recentPosts &&
          recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
      </Slider>
    </section>
  );
}

export default Recommendation;
