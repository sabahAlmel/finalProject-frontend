import React from "react";
import DashCategories from "../components/DashCategories";
import DashSubCategories from "../components/DashSubCategories";
import { motion } from "framer-motion";

function DashSubAndCategory({ isOpen, isMobile, setIsOpen }) {
  return (
    <motion.div
      className="flex mx-auto flex-col w-full justify-between md:mx-2 lg:mx-10 lg:flex-row "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <DashCategories
        isMobile={isMobile}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <DashSubCategories />
    </motion.div>
  );
}

export default DashSubAndCategory;
