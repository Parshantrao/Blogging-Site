import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useNavigation from '../../hooks/useNavigation'

function NavLink({ to, title, active, icon }) {

    return (
        <Link
            to={to}
            className={`no-underline relative transition-all duration-500 md:text-xl py-2 font-semibold leading-none  ${active ? "text-pink-500 hover:text-pink-600" : "text-sky-500 hover:text-sky-700 before:absolute before:left-1/2 before:bottom-0 before:h-[2px] before:w-0 before:bg-sky-700 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full after:absolute after:right-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-sky-700 after:transition-all after:duration-500 hover:after:right-0 hover:after:w-full"}`}
        >
            {title}
            <span className='ml-1 sm:ml-2 text-xs md:text-lg'>
                {icon}
            </span>
        </Link>
    )
}

function Header() {
    const navItems = useNavigation()
    const navigate = useNavigate()
    return (
        <div className='bg-gray-100'>
            <div className='flex items-center py-2 row-auto'>
                <div className='col flex items-center '>
                    <h1 className="text-2xl md:text-4xl font-bold transform transition-all bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent p-2 leading-none text-center cursor-pointer" onClick={()=>navigate("/")}>
                        Blogs
                    </h1>
                </div>
                <div className='flex'>
                    <nav className='ml-auto flex justify-end space-x-3 sm:space-x-16 pr-6'>
                        {
                            navItems.map(item => {
                                return <NavLink key={item.title} to={item.link} title={item.title} icon={item.icon} active={item.active} />
                            })
                        }
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Header