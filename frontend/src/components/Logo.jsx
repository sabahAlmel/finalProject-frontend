import React from "react";
import family from "../assets/icons/family.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className=" flex self-center whitespace-nowrap text-[18px] sm:text-2xl font-semibold dark:text-white "
    >
      <span>
        <img src={family} alt="logo" className="w-70 h-70" />
      </span>
      <span className="cavoliniBold">Tarbiya</span>
      <span className="cavolini ">Tales</span>
    </Link>
  );
}

export default Logo;
