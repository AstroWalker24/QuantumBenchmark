import React, { useState, useEffect } from 'react'
import NavMenu from '../elements/NavMenu'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ logo }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 20);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);


    return (
        <>
            <motion.div
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50' : 'bg-transparent'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className='w-full flex flex-row justify-between items-center px-10 py-5 bg-inherit h-[80px]'>
                    <div className='logo-wrapper flex flex-row justify-center items-center gap-1'>
                        <img src={logo} alt="logo" className='w-10 h-10' />
                        <h1 className='text-white text-2xl font-bold'><span className='text-green-500 mr-[1px]'>Q</span>Bench</h1>
                    </div>
                    <NavMenu />
                    <div className='auth-wrapper flex flex-row justify-center items-center gap-4'>
                        <button className='bg-green-500 text-black px-4 py-2 rounded-xl font-bold text-md hover:bg-green-600 transition-all duration-300 cursor-pointer'>
                            Sign In
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
