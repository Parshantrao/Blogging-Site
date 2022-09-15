import React, { useRef, useState, useEffect } from 'react'
import { categories } from '../../constants/blogCategories'

const initialFormData = {
    title: "",
    content: "",
    category: "",
    subcategory: ""
}

function AddNewBlog({ onClose }) {
    const [formData, setFormData] = useState(initialFormData)
    const [img, setImg] = useState(null)

    const modelRef = useRef(null)

    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setSearchCategory] = useState('')
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);


    const categorySearchList = searchCategory && categories.filter(item => {
        return item.name.toLowerCase().includes(searchCategory.toLowerCase())
    })




    const handleModelClose = (e) => {
        // console.log('Clicked')
        if (modelRef.current && !modelRef.current.contains(e.target)) {
            onClose()
        }
    }

    const handleSaveBlog = async (e) => {
        e.preventDefault()
        const apiData = await fetch('http://localhost:3001/blogs', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
        const response = await apiData.json()

    }

    // tags: { type: [String] },
    // category: { type: String, required: true, trim: true, lowercase: true },
    // subcategory: { type: [String] },
    return (
        <div
            onClick={handleModelClose}
            className='fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-30 backdrop-blur-sm'
        >
            <div
                ref={modelRef}
                className='relative max-w-[800px] w-full mx-4 sm:mx-6 lg:mx-8 max-h-screen overflow-auto p-4 bg-white shadow-md rounded-lg'
            >
                <button
                    onClick={onClose}
                    className="absolute top-0 right-1 text-xl text-gray-600 hover:text-gray-800"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Let's Add a New Blog...
                </h1>
                <form onSubmit={handleSaveBlog} >
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            id="title"
                            value={formData.title}
                            onChange={(e) => {
                                if (e.target.value && e.target.value.trim() !== "") {
                                    setFormData({
                                        ...formData,
                                        title: e.target.value.trim()
                                    })
                                }
                            }}
                            className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Add title"
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
                            Search Categories
                        </label>
                        <input
                            id="category"
                            type="text"
                            value={searchCategory}
                            onChange={(e) => {
                                setSearchCategory(e.target.value)
                            }}
                            className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Search categories..."
                        />
                        {categorySearchList ? categorySearchList.length > 0 ? (
                            <ul className="absolute mt-2 border w-full border-gray-300 rounded-md bg-white p-0">
                                {categorySearchList.map(cat => (
                                    <li
                                        key={cat.name}
                                        // onClick={() => handleCategorySelect(cat.name)}
                                        className="px-2 py-2 cursor-pointer hover:bg-gray-200"
                                    >
                                        {cat.name}
                                    </li>
                                ))}
                            </ul>
                        ) : <button className='absolute bottom-[-40px] right-2 px-2 py-1 border rounded mt-2'>Add</button> : ""}
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
                            Search Categories
                        </label>
                        <input
                            id="category"
                            type="text"
                            value={searchCategory}
                            onChange={(e) => {
                                setSearchCategory(e.target.value)
                            }}
                            className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Search categories..."
                        />
                        {categorySearchList ? categorySearchList.length > 0 ? (
                            <ul className="absolute mt-2 border w-full border-gray-300 rounded-md bg-white p-0">
                                {categorySearchList.map(cat => (
                                    <li
                                        key={cat.name}
                                        // onClick={() => handleCategorySelect(cat.name)}
                                        className="px-2 py-2 cursor-pointer hover:bg-gray-200"
                                    >
                                        {cat.name}
                                    </li>
                                ))}
                            </ul>
                        ) : <button className='absolute bottom-[-40px] right-2 px-2 py-1 border rounded mt-2'>Add</button> : ""}
                    </div>

                    {/* <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="subcategory">
                                Search Subcategories
                            </label>
                            <input
                                id="subcategory"
                                type="text"
                                // value={formData.subcategory}
                                // onChange={(e) => handleSubcategorySelect(e.target.value)}
                                className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Search subcategories..."
                            />

                            {formData.category && filteredSubcategories.length > 0 && (
                                <ul className="mt-2 border border-gray-300 rounded-md bg-white">
                                    {filteredSubcategories.map(subcat => (
                                        <li
                                            key={subcat.name}
                                            // onClick={() => handleSubcategorySelect(subcat.name)}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        >
                                            {subcat.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div> */}


                    {/* {formData.subcategory && (
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="tag">
                                    Search Tags
                                </label>
                                <input
                                    id="tag"
                                    type="text"
                                    value={formData.tag}
                                    onChange={(e) => handleTagSelect(e.target.value)}
                                    className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Search tags..."
                                />
                                {filteredTags.length > 0 && (
                                    <ul className="mt-2 border border-gray-300 rounded-md bg-white">
                                        {filteredTags.map((tag, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleTagSelect(tag)}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )} */}



                    {/* Add more form fields or a submit button here */}

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="image">
                            Image
                        </label>
                        <input
                            id="image"
                            onChange={(e) => {
                                setImg(e.target.files[0])
                            }}
                            type="file"
                            accept="image/*"
                            className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => {
                                if (e.target.value && e.target.value.trim() !== "") {
                                    setFormData({
                                        ...formData,
                                        content: e.target.value.trim()
                                    })
                                }
                            }}
                            className="w-full px-2 py-2 h-32 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Add blog content"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            {/* <p>Add new Blog</p> */}
        </div>
        // </div>
    )
}

export default AddNewBlog