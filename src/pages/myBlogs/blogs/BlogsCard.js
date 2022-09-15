import React from 'react';

function BlogsCard() {
  return (
    <div className="flex grow items-center justify-center">
      <div className="p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
        <span className="text-2xl font-bold text-gray-700 select-none">
          No Blogs Added
        </span>
      </div>
    </div>
  );
}

export default BlogsCard;
