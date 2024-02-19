import React from "react";
import DashCategories from "../components/DashCategories";
import DashSubCategories from "../components/DashSubCategories";

function DashSubAndCategory() {
  return (
    <div className="flex mx-auto flex-col w-full justify-between md:mx-2 lg:mx-10 lg:flex-row ">
      <DashCategories />
      <DashSubCategories />
    </div>
  );
}

export default DashSubAndCategory;
