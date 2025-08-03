import React from 'react'
import Navbar from '../components/Navbar';
import Logo from '../assets/logos/logo.png';
import HeroImage from '../assets/illustrations/illustration.webp';
export default function HeroPage() {
    return (
        <>
            <div className='w-full min-h-[100dvh] flex flex-col bg-gray-950'>
                <Navbar logo={Logo} />
                <div className='hero-section-wrapper flex flex-col justify-center items-center w-full min-h-[calc(100dvh-110px)] mt-6 px-10 gap-10'>
                    <h1 className='text-[70px] font-bold text-white leading-20 text-center'>Say <span className='text-green-500'>Goodbye</span> to manual Quantum Performance analysis</h1>
                    <div className='caption-wrapper flex flex-row justify-center items-center w-[60%]'>
                        <p className='text-white text-xl leading-relaxed text-center font-serif'>
                            <span className='font-bold'>Meet QBench.</span> The cutting-edge, comprehensive, and reliable platform for benchmarking quantum systems and optimizing quantum workflows.
                        </p>
                    </div>
                    <div className='hero-cta-wrapper mt-4 flex flex-row justify-center items-center gap-4'>
                        <button className='bg-green-500 text-black px-4 py-4 w-[200px] rounded-xl font-bold text-md hover:bg-green-600 transition-all duration-300 cursor-pointer'>
                            Get Started
                        </button>
                    </div>


                </div>
            </div>
        </>
    )
}
