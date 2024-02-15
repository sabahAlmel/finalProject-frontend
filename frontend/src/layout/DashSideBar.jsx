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

export default function DashSidebar() {
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
  return (
    <Sidebar className="w-full md:w-56 ">
      <Sidebar.ItemGroup className="flex flex-col gap-2">
        <Link to="/dashboard?tab=dash">
          <Sidebar.Item
            className="text-lg"
            active={tab === "dash" || !tab}
            icon={HiChartPie}
            as="div"
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
