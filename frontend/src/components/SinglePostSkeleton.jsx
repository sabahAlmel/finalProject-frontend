import React from "react";
import Skeleton from "./Skeleton";

function SinglePostSkeleton() {
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="bg-gray-300 w-60 h-10 mt-10 p-3 max-w-2xl mx-auto rounded-full "></h1>
      <div className="mt-7 p-3 h-[500px] w-full object-cover transition-all duration-300 z-20 relative flex justify-center items-center bg-gray-300 animate-pulse">
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
      <div className="flex justify-between p-4 border-b border-slate-500 mx-auto w-full">
        <div className="flex gap-3">
          <div className="h-14 w-14 bg-gray-300 rounded-full animate-pulse"></div>
          <div className=" self-center">
            <div className="mb-2 h-3 w-20 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-20 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <div className="bg-gray-300 rounded-full self-center w-20 h-3"></div>
      </div>
      {[...Array(4)].map((_, index) => (
        <div className="mt-5">
          <div className="p-3 w-[25%] mb-3 h-5 bg-gray-300 rounded-full"></div>{" "}
          <div className="p-3 mb-3 mx-auto w-full h-3 bg-gray-300 rounded-full"></div>{" "}
          <div className="p-3 mb-3 mx-auto w-full h-3 bg-gray-300 rounded-full"></div>{" "}
          <div className="p-3 mb-3 mx-auto w-full h-3 bg-gray-300 rounded-full"></div>
        </div>
      ))}
      <div className="flex flex-col w-full justify-center items-center my-10">
        <h1 className="mt-5 w-60 h-10 bg-gray-300 rounded-full"></h1>
        <div className="flex flex-wrap w-[90vw] sm:w-[80vw] mt-10 justify-center">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default SinglePostSkeleton;
