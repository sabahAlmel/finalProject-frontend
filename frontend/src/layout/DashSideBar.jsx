import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiFolder,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signout } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function DashSidebar({ isOpen, isMobile, setIsOpen }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    localStorage.removeItem("token");
    dispatch(signout());
    navigate("/");
  };

  const handleSidebarItemClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <Sidebar
      className={`w-full fixed top-0 z-20 md:w-56 md:relative transition-all duration-1000`}
      style={{
        left: isOpen ? "0" : "-1000px",
        width: isOpen ? (isMobile ? "100%" : "14rem") : "0",
      }}
    >
      {isMobile && (
        <div
          className="w-full flex justify-end text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          x
        </div>
      )}
      <Sidebar.ItemGroup className="flex pt-9 flex-col gap-2">
        <Link to="/dashboard?tab=dash">
          <Sidebar.Item
            className="text-lg"
            active={tab === "dash" || !tab}
            icon={HiChartPie}
            as="div"
            onClick={handleSidebarItemClick}
          >
            Dashboard
          </Sidebar.Item>
        </Link>
        <Link to="/dashboard?tab=posts">
          <Sidebar.Item
            active={tab === "posts"}
            className="text-lg"
            icon={HiDocumentText}
            as="div"
            onClick={handleSidebarItemClick}
          >
            Posts
          </Sidebar.Item>
        </Link>

        <Link to="/dashboard?tab=categories">
          <Sidebar.Item
            active={tab === "categories"}
            className="text-lg"
            icon={HiFolder}
            as="div"
            onClick={handleSidebarItemClick}
          >
            Categories
          </Sidebar.Item>
        </Link>

        <Link to="/dashboard?tab=users">
          <Sidebar.Item
            active={tab === "users"}
            className="text-lg"
            icon={HiOutlineUserGroup}
            as="div"
            onClick={handleSidebarItemClick}
          >
            Users
          </Sidebar.Item>
        </Link>
        <Link to="/dashboard?tab=comments">
          <Sidebar.Item
            active={tab === "comments"}
            className="text-lg"
            icon={HiAnnotation}
            as="div"
            onClick={handleSidebarItemClick}
          >
            Comments
          </Sidebar.Item>
        </Link>
        <Sidebar.Item
          icon={HiArrowSmRight}
          className="cursor-pointer text-lg"
          onClick={handleSignout}
        >
          Sign Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar>
  );
}
