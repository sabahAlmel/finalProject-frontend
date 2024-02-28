import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import RecentPost from "../components/RecentPost";
import RecommendedEducation from "../components/RecommendedEducation";
import RecommendedFood from "../components/RecommendedFood";
import RecommendedActivity from "../components/RecommendedActivity";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <HeroSection />
      <RecentPost />
      <RecommendedEducation />
      {/* <RecommendedFood />
      <RecommendedActivity /> */}
      <div className="w-full flex justify-center mb-10">
        <Link
          to={"/search"}
          className="text-xl text-customMediumBlue hover:underline"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
}

export default Home;
