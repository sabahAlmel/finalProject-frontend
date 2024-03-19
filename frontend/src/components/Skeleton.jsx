import React from "react";

const Skeleton = () => {
  return (
    <div
      className={`w-[85%] sm:w-[350px] group relative mx-4 border border-customMediumBlue h-[350px] overflow-hidden rounded-lg transition-all mb-6`}
    >
      <div className="h-[260px] w-full object-cover transition-all duration-300 z-20 relative flex justify-center items-center bg-gray-300 animate-pulse">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <p className="bg-gray-300 h-5 rounded-full mb-2"></p>
        <div className="flex w-[100%] justify-between ">
          <span className="bg-gray-300 w-8 h-4 rounded-full"></span>
          <span className="bg-gray-300 w-8 h-4 rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
