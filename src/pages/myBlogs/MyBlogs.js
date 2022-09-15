import React, { useState } from 'react'
import BlogsCard from './blogs/BlogsCard'
import AddNewBlog from '../../components/newBlog/AddNewBlog'

function MyBlogs() {
  const [addNewBlog,setAddNewBlog]=useState(false)
  return (
    <>
    <div className="relative flex h-[calc(100vh-80px)]">
      <div className='w-full flex flex-col'>
        <div className='p-3 border-b-2 border-gray-200'>
          <button className='px-2 py-1.5 bg-indigo-500 text-white font-semibold rounded' onClick={()=>setAddNewBlog(true)}>Add New Blog</button>
        </div>
        
        <BlogsCard />
      </div>
    </div>
      {
        addNewBlog && <AddNewBlog onClose={()=>setAddNewBlog(false)} />
      }
    </>
  )
}

export default MyBlogs