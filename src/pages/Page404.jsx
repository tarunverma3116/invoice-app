import React from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full min-h-screen mx-auto px-10 py-8 bg-white shadow-lg flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <img
            src={window.location.origin + "/img/404.jpg"}
            alt=""
            className="w-64 h-64"
          />
          <button
            onClick={() => navigate("/")}
            className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
          >
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page404;
