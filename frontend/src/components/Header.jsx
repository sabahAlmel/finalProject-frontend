import React, { useState } from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

function Header() {
  const [hover, setHover] = useState(false);
  const handleHover = () => {
    setHover(!hover);
  };
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2 ">
      <Link
        to="/"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        className="self-center whitespace-nowrap lg:text-4xl sm:text-xl font-semibold dark:text-white "
      >
        <span className="sevastian">PAREN</span>
        <span
          className={`sevastian logo bg-gradient-to-r from-customLightBlue to-customGreenBlue text-white rounded-md ${
            hover ? "from-customBeige to-customOrange" : ""
          }`}
        >
          TOUCH
        </span>
      </Link>
      <form className="lg:text-4xl sm:text-xl">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-15 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-15 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/signin">
          <Button
            className="bg-gradient-to-r from-customLightBlue to-customGreenBlue"
            outline
          >
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/" className="lg:text-2xl sm:text-xl">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about" className="lg:text-2xl sm:text-xl">
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects" className="lg:text-2xl sm:text-xl">
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
