import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/user/userSlice";
import { toggleTheme } from "../redux/theme/themeSlice";
import Logo from "../components/Logo";
function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();
  const path = useLocation().pathname;

  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  const handleSignout = () => {
    localStorage.removeItem("token");
    dispatch(signout());
    navigate("/");
  };
  return (
    <Navbar
      className={`border-b-2 headerNav ${path == "/" ? "headerHome" : ""} `}
    >
      <Logo />
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-15 h-10 sm:mr-3 inline"
          color="gray"
          pill
          onClick={handleTheme}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {currentUser.role === "admin" && (
              <>
                {location.pathname != "/dashboard" ? (
                  <Link to={"/dashboard?tab=dash"}>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                ) : (
                  <Link to={"/"}>
                    <Dropdown.Item>Home</Dropdown.Item>
                  </Link>
                )}
                <Dropdown.Divider />
              </>
            )}
            <Link to={"/profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Link to={"/createpost"}>
              <Dropdown.Item>Create Article</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link
            to="/auth"
            className="cursor-pointer text-white bg-gradient-to-r from-customMediumBlue to-customGreenBlue hover:from-customGreenBlue hover:to-customMediumBlue p-2 rounded-md "
          >
            Sign In
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      {location.pathname != "/dashboard" && (
        <Navbar.Collapse className="mobile">
          <Link to="/" className="lg:text-2xl sm:text-xl">
            <Navbar.Link active={path === "/"} as={"div"}>
              Home
            </Navbar.Link>
          </Link>
          <Link to="/about" className="lg:text-2xl sm:text-xl">
            <Navbar.Link active={path === "/about"} as={"div"}>
              About
            </Navbar.Link>
          </Link>
          <Link to="/search" className="lg:text-2xl sm:text-xl">
            <Navbar.Link active={path === "/search"} as={"div"}>
              Articles
            </Navbar.Link>
          </Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}

export default Header;
