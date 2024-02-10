import React, { useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/user/userSlice";
import { toggleTheme } from "../redux/theme/themeSlice";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const path = useLocation().pathname;
  const [hover, setHover] = useState(false);
  const handleHover = () => {
    setHover(!hover);
  };
  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  const handleSignout = () => {
    localStorage.removeItem("token");
    dispatch(signout());
    navigate("/");
  };
  return (
    <Navbar className="border-b-2 ">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-2xl lg:text-4xl  font-semibold dark:text-white "
      >
        <span
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          className="sevastian"
        >
          PAREN
        </span>
        <span
          className={`sevastian logo bg-gradient-to-r from-customLightBlue to-customGreenBlue text-white rounded-md ${
            hover
              ? " from-customGreenBlue to-customLightBlue"
              : "hover:from-customGreenBlue hover:to-customLightBlue"
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
        <Button
          className="w-15 h-10 inline"
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
                <Link to={"/dashboard"}>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
              </>
            )}
            <Link to={"/profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Link to={"/createpost"}>
              <Dropdown.Item>Create Post</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/auth">
            <Button
              className="text-white bg-gradient-to-r from-customLightBlue to-customGreenBlue"
              outline
            >
              Sign In
            </Button>
          </Link>
        )}
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
