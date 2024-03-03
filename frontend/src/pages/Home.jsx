import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import RecentPost from "../components/RecentPost";
import Recommendation from "../components/Recommendation";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import icon from "../assets/icons/family.png";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Home</title>
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
      </Helmet>
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
    </motion.div>
  );
}

export default Home;
