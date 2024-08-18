import React, { useState } from 'react';
import { useAuth } from '../store/auth';

const Navbar = () => {
    const { isLoggedIn } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className=''>
            <nav className='bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-500'>
                <div className="container mx-auto flex justify-between items-center px-6 py-3">
                    <div className='flex items-center'>
                        <span><img className='w-12 h-12 md:w-24 md:h-24' src="/logo.png" alt="Logo" /></span>
                        <span className='text-white font-bold text-xl mb-2 md:text-3xl mt-2 md:mt-1 ml-2'>Attendance Tracker</span>
                    </div>
                    <div className='hidden md:block'>
                        <ul className='flex'>
                            <li className='m-3 text-lg text-white'>
                                <a href="/">Dashboard</a>
                            </li>
                            <li className='m-3 text-lg text-white'>
                                <a href="/subjects">Subjects</a>
                            </li>
                            <li className='m-3 text-lg text-white'>
                                <a href="/create-subject">Create Subject</a>
                            </li>
                            <li className='m-3 text-lg text-white'>
                                <a href="/upload-timetable/:id">Upload Timetable</a>
                            </li>
                            <li className='m-3 text-lg text-white'>
                                <a href="/display-timetable">Display Timetable</a>
                            </li>
                            <li className='m-3 text-lg text-white'>
                                <a href="/mark-attendance">Mark Attendance</a>
                            </li>
                            <li className='m-3 text-lg text-white'>
                                <a href="/attendance-percentage/:studentId">Attendance Percentage</a>
                            </li>
                        </ul>
                    </div>
                    <div className='hidden md:flex mt-3'>
                    {isLoggedIn ? (
                        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hhover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"><a href="/logout">Logout</a></button>
                    ) : (<>
                        <button className="relative inline-flex items-center justify-center p-0.5 mx-2 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"><a href="/login">Login</a></span>
                        </button>
                        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hhover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"><a href="/register">Sign Up</a></button>
                        </>)}
                    </div>
                    <div className='md:hidden flex items-center'>
                        <button onClick={toggleMenu} className='text-white focus:outline-none'>
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
                            </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className='md:hidden'>
                        <ul className='flex flex-col items-center'>
                            <li className='m-3 text-lg text-white'>
                                <a href="/">Dashboard</a>
                            </li>
                            <li className='m-3 text-lg text-white'>
                                <a href="/subjects">Subjects</a>
                            </li>
                            <li className='m-3 text-lg text-white'>
                                <a href="/create-subject">Create Subject</a>
                            </li>
                            <li className='m-3 text-lg text-white'>
                                <a href="/upload-timetable/:id">Upload Timetable</a>
                            </li>
                            <li className='m-3 text-lg text-white'>
                                <a href="/mark-attendance">Mark Attendance</a>
                            </li>
                            <li className='m-3 text-lg text-white'>
                                <a href="/attendance-percentage/:studentId">Attendance Percentage</a>
                            </li>
                            <div className='mt-3'>
                            {isLoggedIn ? (
                                <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hhover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"><a href="/logout">Logout</a></button>
                            ) : (<>
                                <button className="relative inline-flex items-center justify-center p-0.5 mx-2 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"><a href="/login">Login</a></span>
                                </button>
                                <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hhover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"><a href="/register">Sign Up</a></button>
                                </>)}
                            </div>
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;


