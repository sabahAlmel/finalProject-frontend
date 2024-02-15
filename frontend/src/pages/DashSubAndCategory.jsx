import React from "react";
import DashCategories from "../components/DashCategories";
import DashSubCategories from "../components/DashSubCategories";

function DashSubAndCategory() {
  return (
    <div className="flex flex-col mx-auto lg:flex-row ">
      <DashCategories />
      <DashSubCategories />
    </div>
  );
}

export default DashSubAndCategory;
