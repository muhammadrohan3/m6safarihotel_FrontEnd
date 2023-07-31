import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [path, setPath] = useState(window.location.pathname);
    const dispatch = useDispatch();
    const handleDropdownToggle = () => {
        setHover(!hover);
    };
    useEffect(() => {
        setPath(window.location.pathname);
    }, [window.location.pathname]);
    
    return (
        <div>
            <nav className="bg-base">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">M6 Safari Hotel</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        className={`${isOpen ? '' : 'hidden'} w-full md:block md:w-auto`}
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-600 md:bg-base border-gray-700">
                            <li>
                                <Link
                                    to="/"
                                    className={`block py-2 pl-3 pr-4 text-white ${path === "/" ? "bg-primary md:text-green-500" :''} rounded md:bg-transparent md:p-0  `}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/rooms"
                                    className={`block py-2 pl-3 pr-4 text-white ${path === "/rooms" ? "bg-primary md:text-green-500" :''} rounded md:bg-transparent md:p-0  `}
                                >
                                    Rooms
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/expenses"
                                    className={`block py-2 pl-3 pr-4 text-white ${path === "/expenses" ? "bg-primary md:text-green-500" :''} rounded md:bg-transparent md:p-0  `}
                                >
                                    Expenses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/drinks"
                                    className={`block py-2 pl-3 pr-4 text-white ${path === "/drinks" ? "bg-primary md:text-green-500" :''} rounded md:bg-transparent md:p-0  `}
                                >
                                    Drinks
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/food"
                                    className={`block py-2 pl-3 pr-4 text-white ${path === "/food" ? "bg-primary md:text-green-500" :''} rounded md:bg-transparent md:p-0  `}
                                >
                                    Food
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/users"
                                    className={`block py-2 pl-3 pr-4 text-white ${path === "/users" ? "bg-primary md:text-green-500" :''} rounded md:bg-transparent md:p-0  `}
                                >
                                    Users
                                </Link>
                            </li>
                            <li className='md:hidden'>
                                <p
                                    className="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:p-0 md:text-green-500"
                                    onClick={() => ""}
                                >
                                    Log Out
                                </p>
                            </li>
                            <li onClick={handleDropdownToggle} className='hidden md:block' >
                                <div className="relative " >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-8 h-8 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    {hover && (
                                        <div className=" w-[200px] absolute top-full right-0 mt-2 rounded-md bg-white shadow-md">
                                            <ul className="py-2">
                                                <li>
                                                    <Link
                                                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                                        to="/change-password"
                                                    >
                                                        Change Password
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                                        onClick={() => dispatch({ type: 'LOGOUT' })}
                                                    >
                                                        Log Out
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
