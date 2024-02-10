import React from "react";
import { Link } from "react-router-dom";

function Page403() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="mb-4">You are not authorized to access this page.</p>
        <Link
          to="/"
          className="bg-gradient-to-r from-customGreenBlue to-customLightBlue hover:from-customLightBlue hover:to-customGreenBlue text-white font-bold py-2 px-4 rounded "
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Page403;
