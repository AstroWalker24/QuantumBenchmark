import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logos/logo.png';
import { createTips } from '../utils';
import { useLoadingSimulator } from '../hooks/useLoadingSimulator';

export default function Loading() {
    const tips = useMemo(() => createTips(), []);
    const { progress, tipIndex } = useLoadingSimulator(tips);
    const currentTip = tips[tipIndex];

    return (
        <div className='fixed inset-0 z-[9999] bg-gray-950 flex items-center justify-center'>
            <div className='w-full px-8 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex flex-col items-center gap-4'
                >
                    <img src={Logo} alt="QBench logo" className='w-16 h-16' />
                    <h2 className='text-white text-4xl font-bold'>
                        <span className='text-green-500 mr-[2px]'>Q</span>Bench
                    </h2>

                    <div className='relative w-1/2 h-2 bg-gray-800 rounded-full overflow-hidden'>
                        <motion.div
                            className='absolute left-0 top-0 h-full bg-green-500'
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: 'easeInOut', duration: 0.35 }}
                        />
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse' />
                    </div>
                    <p className='text-gray-400 text-md'>Loading.. {Math.round(progress)}%</p>

                    <AnimatePresence mode='wait'>
                        <motion.p
                            key={tipIndex}
                            className='text-gray-500 text-sm'
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25 }}
                        >
                            {tips[tipIndex]}
                        </motion.p>
                    </AnimatePresence>

                    <div className='mt-2 flex gap-2'>
                        <span className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                        <span className='w-2 h-2 rounded-full bg-green-500/70 animate-pulse' style={{ animationDelay: '120ms' }} />
                        <span className='w-2 h-2 rounded-full bg-green-500/40 animate-pulse' style={{ animationDelay: '240ms' }} />
                    </div>
                </motion.div>
            </div>
        </div>
    )

}