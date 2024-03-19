import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import icon from "../assets/icons/family.png";
import { motion } from "framer-motion";
import about from "../assets/images/aboutUs.png";
import { FaBabyCarriage, FaBookOpen, FaChild } from "react-icons/fa";

function About() {
  return (
    <motion.div
      className="mb-10 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>About Us</title>
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
      </Helmet>
      <div className="flex items-center">
        <div className=" w-[90vw] lg:w-[50vw] flex flex-col gap-8 m-5 md:m-10">
          <h1 className="text-4xl font-semibold">OUR STORY</h1>
          <p className="text-xl leading-8">
            At Tarbiatales, we believe that every parent has a unique story to
            share. In a digital landscape filled with noise and distractions,
            Tarbiatales is a serene sanctuary where heartfelt narratives and
            insightful perspectives on parenting find a home. Our platform is
            more than just a blog; it's a tranquil oasis where the quiet power
            of shared experiences fosters connection, understanding, and growth.
          </p>
          <p className="text-xl leading-8">
            Parenting is a journey filled with moments of joy, challenges, and
            profound lessons. Amidst the chaos of everyday life, Tarbiatales
            provides a space for parents to pause, reflect, and share their
            wisdom with the world. Whether you're a seasoned parent or embarking
            on the adventure of parenthood for the first time, Tarbiatales
            welcomes you to join our community of storytellers.
          </p>
          <p className="text-xl leading-8">
            In a world where quick soundbites and superficial content dominate,
            Tarbiatales stands as a beacon of depth, nuance, and meaningful
            dialogue. We believe in the transformative power of storytelling to
            unite, inspire, and empower. Our mission is to amplify the voices of
            parents from all walks of life, creating a tapestry of shared
            experiences that enriches our collective understanding of
            parenthood.
          </p>
          <p className="text-xl leading-8">
            Join us in celebrating the diversity of parenting journeys and the
            profound impact of authentic storytelling. Whether you're here to
            seek guidance, share your own experiences, or simply find solace in
            the stories of others, Tarbiatales invites you to be part of our
            nurturing community.
          </p>
          <p className="text-xl leading-8">
            Together, let's elevate the conversation around parenting, deepen
            our connections, and pave the way for a brighter, more informed
            future for families everywhere.
          </p>
          <p className="text-xl leading-8">
            Thank you for being a part of the Tarbiatales family.
          </p>
        </div>
        <div className="lg:block relative hidden">
          <img src={about} alt="aboutUs" />
          <div className="text-4xl lg:block hidden text-customMediumBlue dark:text-white">
            <div className="absolute top-[0rem] right-[15rem]">
              <FaBabyCarriage />
            </div>
            <div className="absolute top-[2rem] right-[40rem]">
              <FaBookOpen />
            </div>
            <div className="absolute top-[9rem] right-[4rem]">
              <FaChild />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%]">
        <Link
          to="/"
          className="p-10 block text-3xl transition-all duration-200 bg-customMediumBlue hover:bg-customPurple text-white border-b-2 border-b-white"
        >
          Read Article
        </Link>
        <Link
          to="/createpost"
          className="p-10 block text-3xl bg-customMediumBlue hover:bg-customPurple  text-white "
        >
          Write Article
        </Link>
      </div>
    </motion.div>
  );
}

export default About;
