import React from 'react'
import NavMenu from '../elements/NavMenu'

export default function Navbar({ logo }) {
    return (
        <>
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
        </>
    )
}
