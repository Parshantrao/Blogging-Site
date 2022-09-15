import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gradient-to-r from-blue-300 to-indigo-500">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg md:text-5xl lg:text-6xl animate-fade-in">
          Welcome to My Blogging Site
        </h1>
        <div className="flex space-x-4 justify-center mt-4">
          <button className="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-500 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105" onClick={()=>navigate("/my-blogs")}>
            Add Blog
          </button>
          <button className="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-500 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105" onClick={()=>navigate("blogs")}>
            Read Blogs
          </button>
        </div>


      </div>
    </div>
  );
}

export default DashboardPage;
