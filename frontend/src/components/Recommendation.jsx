import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { fetchMostRecommendPost } from "../db/fetchPost";
import Slider from "react-slick";
import Skeleton from "./Skeleton";

function Recommendation() {
  const [recentPosts, setRecentPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
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
        setLoading(true);
        const res = await fetchMostRecommendPost(10);
        if (res.status === 200) {
          setRecentPosts(res.data);
          setLoading(false);
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
      {loading ? (
        <div className="flex flex-wrap">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        <Slider {...settings} className="xl:w-[83%] w-[95%] h-[370px] mx-auto">
          {recentPosts &&
            recentPosts.map((post) => (
              <PostCard key={post._id} post={post} home={true} />
            ))}
        </Slider>
      )}
    </section>
  );
}

export default Recommendation;
