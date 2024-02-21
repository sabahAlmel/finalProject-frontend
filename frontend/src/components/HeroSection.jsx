import React, { useEffect, useState } from "react";
import desktop from "../assets/images/desktop.png";
import mobile from "../assets/images/responsive.png";
import { Link } from "react-router-dom";

function HeroSection() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <section
      className="flex justify-between items-center h-screen hero"
      style={{
        backgroundImage: `url(${windowWidth >= 1024 ? desktop : mobile})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="lg:w-[50%]"></div>
      <div className="w-full mx-5 lg:ml-0 text-white lg:w-[50%] z-10 ">
        <h1 className="cavolini text-4xl">Ready for Parenting Success?</h1>
        <p className="cavolini text-3xl mt-3 mb-3">
          Are you ready to take your parenting skills and knowledge to the next
          level?{" "}
        </p>
        <Link
          to="/auth"
          className="text-3xl mt-3 font-semibold cursor-pointer bg-gradient-to-r from-customPink to-customPurple hover:from-customPurple hover:to-customPink text-transparent bg-clip-text "
        >
          Start Here
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
