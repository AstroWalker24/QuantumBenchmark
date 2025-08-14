import React, { useState } from 'react';
import { Play, Loader, AlertTriangle, Code, Zap, BarChart3, Settings, CheckCircle, Clock, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { sampleQasmCode, SelectedSimulators, simulators } from '../utils';
import Navbar from '../components/Navbar';
import Logo from '../assets/logos/logo.png';

export default function Dashboard({ onSubmit, isLoading, error }) {
    const [qasmCode, setQasmCode] = useState(sampleQasmCode);
    const [selectedSimulators, setSelectedSimulators] = useState(SelectedSimulators);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedSimulators(prev => checked ? [...prev, value] : prev.filter(sim => sim !== value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ qasmCode, selectedSimulators });
    };

    return (
        <div className='w-full min-h-[100dvh] flex flex-col bg-gray-950 overflow-x-hidden'>
            <Navbar logo={Logo} />
            <div className='flex flex-row h-auto w-full bg-gray-950 mt-20'>
                <motion.div
                    className='max-w-6xl px-10 mt-10 min-h-[calc(100dvh-100px)] w-4/5'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className='mb-8'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className='flex items-center mb-4'>
                            <h1 className="text-4xl font-bold text-white">
                                Dashboard
                            </h1>
                        </div>

                        <p className='text-gray-400 text-md'>
                            Analyze and compare quantum circuit performance across multiple simulators.
                        </p>
                    </motion.div>

                    <motion.div
                        className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >

                        <div className='bg-gradient-to-r from-gray-600/20 to-white/10 border border-gray-700 rounded-xl p-6 backdrop-blur-sm'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='p-2 bg-white rounded-lg'>
                                    <Cpu className='w-5 h-5 text-black' />
                                </div>
                            </div>

                            <p className='text-gray-400 text-sm'>Active Simulators</p>
                            <p className='text-2xl font-bold text-white'>{selectedSimulators.length}</p>
                        </div>

                        <div className='bg-gradient-to-r from-gray-600/20 to-white/20 border border-gray-700 rounded-xl p-6 backdrop-blur-sm'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='p-2 bg-white rounded-lg'>
                                    <Zap className='w-5 h-5 text-black' />
                                </div>
                            </div>

                            <div>
                                <p className='text-gray-400 text-sm'>Avg. Execution Time</p>
                                <p className='text-2xl font-bold text-white'>~2.3s</p> {/*replace this with average execution time later*/}
                            </div>
                        </div>

                        <div className='bg-gradient-to-r from-gray-600/20 to-white/20 border border-gray-700 rounded-xl p-6 backdrop-blur-sm '>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='p-2 bg-white rounded-lg'>
                                    <CheckCircle className='w-5 h-5 text-black' />
                                </div>
                            </div>
                            <div>
                                <p className='text-gray-400 text-sm'>Success Rate</p>
                                <p className='text-2xl font-bold text-white'>99.8%</p>
                            </div>
                        </div>
                    </motion.div>

                    {error && (
                        <motion.div
                            className='bg-gradient-to-r from-red-900/50 to-red-800/50 border border-red-500/50 text-red-300 px-6 py-4 rounded-xl mb-6 flex items-center gap-3 backdrop-blur-sm'
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AlertTriangle size={20} className='text-red-400' />
                            <span className='font-medium'>{error}</span>
                        </motion.div>
                    )}

                    <motion.form
                        onSubmit={handleSubmit}
                        className='bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl p-8'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className='mb-8'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='p-2 bg-white rounded-lg'>
                                    <Code className='w-5 h-5 text-black' />
                                </div>
                                <label htmlFor="qasm-input" className='text-lg font-semibold text-white'>Quantum Circuit (QASM 2.0)</label>
                            </div>

                            <div className='relative'>
                                <textarea
                                    id="qasm-input"
                                    value={qasmCode}
                                    onChange={(e) => setQasmCode(e.target.value)}
                                    rows="10"
                                    className='w-full bg-gray-900/80 border border-gray-600/50 rounded-xl p-4 font-mono text-sm text-green-300 focus:ring-2 focus:ring-white/10 focus:border-white/10 transition-all duration-300 backdrop-blur-sm placeholder-gray-500'
                                    placeholder='Paste your QASM code here...'
                                    required
                                />
                                <div className='absolute top-3 right-3 flex items-center gap-2 text-xs text-gray-500'>
                                    <Clock className='w-3 h-3' />
                                    <span className='text-xs text-gray-500'>Auto-save enabled</span>
                                </div>
                            </div>
                        </div>

                        <div className='mb-8'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='p-2 bg-white rounded-lg'>
                                    <Settings className='w-5 h-5 text-black' />
                                </div>
                                <label className='text-lg font-semibold text-white'>Select Simulators</label>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                {simulators.map((sim) => (
                                    <motion.label
                                        key={sim.name}
                                        className={`group relative flex items-center p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 backdrop-blur-sm ${selectedSimulators.includes(sim.name) ?
                                            'border-green-500 ' :
                                            'bg-gray-800/50 border-gray-600/50'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <input
                                            type="checkbox"
                                            value={sim.name}
                                            checked={selectedSimulators.includes(sim.name)}
                                            onChange={handleCheckboxChange}
                                            className='h-5 w-5 rounded text-green-500 bg-gray-800 border-gray-500'
                                        />

                                        <div className='ml-4 flex-1'>
                                            <div className='flex items-center gap-2 mb-1'>
                                                <span className='text-2xl'>{sim.icon}</span>
                                                <span className='font-semibold text-white'>
                                                    {sim.name}
                                                </span>
                                            </div>
                                            <p className='text-sm text-gray-400'>{sim.description}</p>
                                        </div>

                                        {selectedSimulators.includes(sim.name) && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                                            >
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </motion.div>
                                        )}
                                    </motion.label>
                                ))}
                            </div>
                        </div>

                        <motion.button
                            type='submit'
                            disabled={isLoading || selectedSimulators.length === 0}
                            className='group relative w-full flex items-center justify-center gap-3 bg-green-500 text-black font-bold py-4 px-8 rounded-xl hover:bg-green-600 transition-all duration-300 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed overflow-hidden'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[-100%] transition-transform duration-1000' />
                            {isLoading ? (
                                <>
                                    <Loader className='animate-spin' size={20} />
                                    <span>Running Benchmark...</span>
                                </>
                            ) : (
                                <>
                                    <Play size={20} className='group-hover:scale-110 transition-transform duration-300' />
                                    <span>Run Quantum Benchmark</span>
                                </>
                            )}
                        </motion.button>

                        <div className='mt-6 text-center'>
                            <p className='text-sm text-gray-500'>
                                Estimated execution time: <span className="text-green-400 font-medium">2-5 minutes</span> •
                                Results will be available in your dashboard
                            </p>
                        </div>
                    </motion.form>



                </motion.div>

                <div className='w-1/5'>
                    <motion.div
                        className=' bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mt-37 h-90 overflow-y-scroll hide-scrollbar flex flex-col'
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >

                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-white rounded-lg'>
                                <Clock className='w-5 h-5 text-black' />
                            </div>
                            <h3 className='text-lg font-semibold text-white'>Recent Activity</h3>
                        </div>

                        <div className='space-y-4'>
                            <div className='flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg'>
                                <div className='w-2 h-2 bg-green-400 rounded-full mt-2'></div>
                                <div className='flex-1'>
                                    <p className='text-white text-sm font-medium'>Bell State Circuit</p>
                                    <p className='text-gray-400 text-xs'>Completed in 2.3s</p>
                                    <p className='text-green-400 text-xs'>Success Rate: 99.2%</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                                <div className="flex-1">
                                    <p className="text-white text-sm font-medium">Grover's Algorithm</p>
                                    <p className="text-gray-400 text-xs">Completed 15 min ago</p>
                                    <p className="text-green-400 text-xs">Running: 45%</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                                <div className="flex-1">
                                    <p className="text-white text-sm font-medium">Quantum Fourier Transform</p>
                                    <p className="text-gray-400 text-xs">Completed 1 hour ago</p>
                                    <p className="text-yellow-400 text-xs">Warning: 87.3%</p>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                    <motion.div className=' bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mt-8 h-90 overflow-y-scroll hide-scrollbar flex flex-col
                    '
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white rounded-lg">
                                <Zap className="w-5 h-5 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
                        </div>

                        <div className='space-y-3 mb-6'>
                            <button className="w-full p-3 bg-transparent border border-green-500/30 rounded-lg text-left  transition-all duration-300">
                                <p className="text-white font-medium">Load Bell State Template</p>
                                <p className="text-gray-400 text-xs">2-qubit entanglement circuit</p>
                            </button>
                            <button className="w-full p-3 bg-transparent border border-green-500/30 rounded-lg text-left  transition-all duration-300">
                                <p className="text-white font-medium">Load Grover's Template</p>
                                <p className="text-gray-400 text-xs">Quantum search algorithm</p>
                            </button>
                            <button className="w-full p-3 bg-transparent border border-green-500/30 rounded-lg text-left transition-all duration-300">
                                <p className="text-white font-medium">Load QFT Template</p>
                                <p className="text-gray-400 text-xs">Quantum Fourier Transform</p>
                            </button>
                        </div>

                        <div className='border-t border-gray-700/50 pt-4'>
                            <h4 className="text-sm font-medium text-gray-300 mb-3">System Status</h4>
                            <div className='space-y-2'>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Qiskit Backend</span>
                                    <span className="text-green-400 text-sm">● Online</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Cirq Backend</span>
                                    <span className="text-green-400 text-sm">● Online</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">PennyLane Backend</span>
                                    <span className="text-yellow-400 text-sm">● Maintenance</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>


                </div>

            </div>





        </div>
    )
}
