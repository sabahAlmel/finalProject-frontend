import React from "react";
import DashCategories from "../components/DashCategories";
import DashSubCategories from "../components/DashSubCategories";

function DashSubAndCategory({ isOpen, isMobile, setIsOpen }) {
  return (
    <div className="flex mx-auto flex-col w-full justify-between md:mx-2 lg:mx-10 lg:flex-row ">
      <DashCategories
        isMobile={isMobile}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <DashSubCategories />
    </div>
  );
}

export default DashSubAndCategory;
