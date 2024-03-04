import React, { useEffect, useState } from "react";
import desktop from "../assets/images/desktop.png";
import mobile from "../assets/images/responsive.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HeroSection() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { currentUser } = useSelector((state) => state.user);

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
        <h1 className=" text-4xl">Ready for Parenting Success?</h1>
        <p className="text-3xl mt-3 mb-7 max-w-[90%]">
          Are you ready to take your parenting skills and knowledge to the next
          level?{" "}
        </p>
        {!currentUser ? (
          <Link
            to="/auth"
            className="text-3xl font-semibold cursor-pointer bg-gradient-to-r from-customGreenBlue to-customMediumBlue hover:from-customMediumBlue hover:to-customGreenBlue p-2 rounded-md "
          >
            Start Here
          </Link>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default HeroSection;
