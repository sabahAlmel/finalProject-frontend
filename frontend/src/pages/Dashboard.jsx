import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../layout/DashSideBar";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashSubAndCategory from "./DashSubAndCategory";
import DashComments from "../components/DashComments";
import DashboardChart from "../components/DashboardChart";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(isMobile ? false : true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className=" min-h-screen flex md:flex-row">
      <div>
        <DashSidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsMobile={setIsMobile}
          isMobile={isMobile}
        />
      </div>
      {tab === "posts" && (
        <DashPosts isMobile={isMobile} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {tab === "users" && (
        <DashUsers isMobile={isMobile} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {tab === "categories" && (
        <DashSubAndCategory
          isMobile={isMobile}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {tab === "comments" && (
        <DashComments
          isMobile={isMobile}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {tab === "dash" && (
        <DashboardChart
          isMobile={isMobile}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}
