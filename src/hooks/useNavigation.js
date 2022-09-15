import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

function useNavigation() {
    const pathName = useLocation().pathname
    const path = useMemo(() => [
        {
            title: "My Blogs",
            active: pathName.startsWith("/my-blogs"),
            link: '/my-blogs',
            icon: <i className="fa-solid fa-file-pen"></i>
        },
        {
            title: "Read Blogs",
            active: pathName.startsWith("/blogs"),
            link: '/blogs',
            icon: <i className="fa-brands fa-blogger-b"></i>
        },
        {
            title: "Profile",
            active: pathName.startsWith("/profile"),
            link: '/profile',
            icon: <i className="fa-solid fa-user"></i>
        },
    ], [pathName])
    return path
}

export default useNavigation