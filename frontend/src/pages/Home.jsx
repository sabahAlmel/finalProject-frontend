import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import RecentPost from "../components/RecentPost";
import Recommendation from "../components/Recommendation";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <HeroSection />
      <RecentPost />
      <Recommendation />
      <div className="w-full flex justify-center mb-10">
        <Link
          to={"/search"}
          className="text-xl text-customMediumBlue hover:underline"
        >
          View all articles
        </Link>
      </div>
    </div>
  );
}

export default Home;
