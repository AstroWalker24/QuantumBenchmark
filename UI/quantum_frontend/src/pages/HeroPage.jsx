import React from 'react'
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


import Navbar from '../components/Navbar';
import Logo from '../assets/logos/logo.png';



export default function HeroPage() {

    const navigateTo = useNavigate();
    return (
        <>
            <div className='w-full min-h-[100dvh] flex flex-col bg-gray-950'>
                <Navbar logo={Logo} />

                <div className='hero-section-wrapper flex flex-col justify-center items-center w-full min-h-[calc(100dvh-110px)] mt-20 px-10 gap-10 overflow-x-hidden'
                >
                    <motion.h1
                        className='text-[70px] font-bold text-white leading-20 text-center'
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        exit={{ opacity: 0, x: -100 }}
                    >
                        Say <span className='text-green-500'
                        >Goodbye</span> {' '}
                        to manual Quantum Performance analysis</motion.h1>


                    <div className='caption-wrapper flex flex-row justify-center items-center w-[60%]'>
                        <motion.p
                            className='text-white text-xl leading-relaxed text-center font-serif'
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                        >
                            <span className='font-bold'>Meet QBench.</span> The cutting-edge, comprehensive, and reliable platform for benchmarking quantum systems and optimizing quantum workflows.
                        </motion.p>
                    </div>

                    <motion.div
                        className='trust-indicators flex flex-col items-center gap-6 mt-8'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <div className='flex items-center gap-2 text-gray-400'>
                            <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'>
                            </div>
                            <span className='text-md'>
                                Trusted by <span className='text-white font-bold'>500+</span> quantum researchers
                            </span>
                        </div>
                    </motion.div>


                    <div className='hero-cta-wrapper mt-4 flex flex-row justify-center items-center gap-4'>
                        <motion.button
                            className='bg-green-500 text-black px-4 py-4 w-[230px] rounded-xl font-bold text-md hover:bg-transparent hover:border-1 hover:border-green-500 hover:text-green-500 transition-all duration-300 cursor-pointer flex flex-row justify-center items-center gap-2'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                            onClick={() => navigateTo("/dashboard")}
                        >
                            <Play size={20} className='mt-[1px]' />
                            Start Benchmarking
                        </motion.button>
                        <motion.button
                            className='border-2 border-green-500 text-green-500 px-4 py-4 w-[230px] rounded-xl font-bold text-md hover:bg-green-500 hover:text-black transition-all duration-300 flex flex-row justify-center items-center gap-2 group bg-transparent'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6, ease: 'easeInOut' }}
                            onClick={() => navigateTo("/demo")}
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Watch Demo
                        </motion.button>
                    </div>
                </div>
            </div>
        </>
    )
}
