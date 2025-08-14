import { useReact, useMemo, useState } from 'react';
import { Server, ArrowRight, GitCompare, TrendingUp, Target, Zap, BarChart3, Filter, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import ResultCard from '../components/ResultCard';

import { calculateStateFidelity, detailedMockResults, getFidelityColor, getFidelityStatus } from '../utils';
import Navbar from '../components/Navbar';
import Logo from '../assets/logos/logo.png'

const Compare = ({ results, navigateTo }) => {
    const validResults = results || detailedMockResults;

    const [compareA, setCompareA] = useState(validResults?.[0]?.backend || '');
    const [compareB, setCompareB] = useState(validResults?.[1]?.backend || '');
    const [selectedMetric, setSelectedMetric] = useState('fidelity');

    const resultA = useMemo(() => validResults?.find(r => r.backend === compareA), [validResults, compareA]);
    const resultB = useMemo(() => validResults?.find(r => r.backend === compareB), [validResults, compareB]);

    const fidelity = useMemo(() => {
        if (resultA && resultB && !resultA.error && !resultB.error) {
            return calculateStateFidelity(resultA.statevector, resultB.statevector);
        }
        return null;
    }, [resultA, resultB]);


    if (!validResults) {
        return (

            <div className='min-h-[100dvh] bg-gray-950 w-full flex flex-col overflow-x-hidden items-center justify-center'>
                <Navbar logo={Logo} />
                <motion.div
                    className='text-center py-16 mx-auto'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className='p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl'>
                        <div className='w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6'>
                            <Server size={40} className="text-gray-400" />
                        </div>
                        <h2 className='text-2xl font-bold text-white mb-3'>No Results to Compare</h2>
                        <p className="text-gray-400 mb-6">Run a benchmark first to enable detailed comparison analysis.</p>
                        <motion.button
                            onClick={() => navigateTo('dashboard')}
                            className='bg-green-500 text-black font-bold py-3 px-8 rounded-xl hover:bg-transparent hover:text-white border hover:border-green-500 transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer'
                        >
                            <Zap size={18} />
                            Go to Dashboard
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }



    const availableBackends = validResults.map(validResult => validResult.backend);
    const SelectBackend = ({ value, onChange, otherValue, label }) => (
        <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-300'>{label}</label>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className='bg-gray-800/50 border border-gray-600/50 rounded-xl p-3 text-white transition-all duration-300 backdrop-blur-sm'
            >
                <option value="">
                    Select Backend
                </option>
                {availableBackends.filter(b => b !== otherValue).map(b => (
                    <option key={b} value={b}>{b}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className='min-h-[100dvh] bg-gray-950 w-full flex flex-col overflow-x-hidden'>
            <Navbar logo={Logo} />
            <motion.div
                className='flex flex-row pt-30 pl-10 justify-between items-center mb-8 gap-4'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <div>
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='p-3 bg-gray-800/50 rounded-xl'>
                            <GitCompare className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-white">
                            Detailed Comparison
                        </h1>
                    </div>
                    <p className='text-gray-400 text-lg'>Compare quantum circuit performance across different backends</p>
                </div>

                <motion.button
                    onClick={() => navigateTo('results')}
                    className="flex items-center gap-2 bg-transparent border border-green-500 text-white font-bold py-3 px-6 mr-10 rounded-xl hover:bg-green-500 hover:text-black transition-all duration-300"
                >
                    <ArrowRight className="transform rotate-180" size={18} />
                    <span>Back to Results</span>
                </motion.button>
            </motion.div>




            <motion.div
                className="bg-gray-900 backdrop-blur-sm border mx-10 border-gray-700/50 rounded-2xl p-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="flex flex-row items-center justify-center gap-8">
                    <SelectBackend value={compareA} onChange={setCompareA} otherValue={compareB} label="Backend A" />

                    <div className="text-center">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white rounded-lg">
                                <Target className="w-5 h-5 text-black" />
                            </div>
                            <h3 className="text-xl font-bold text-white">State Fidelity</h3>
                        </div>

                        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                            <p className={`text-4xl font-mono font-bold ${getFidelityColor(fidelity)}`}>
                                {fidelity !== null ? fidelity.toFixed(6) : 'N/A'}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                {fidelity !== null ? getFidelityStatus(fidelity) : 'No data'}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">(Closer to 1.000000 is better)</p>
                        </div>
                    </div>

                    <SelectBackend value={compareB} onChange={setCompareB} otherValue={compareA} label="Backend B" />
                </div>
            </motion.div>


            <motion.div
                className="flex items-center gap-4 mb-6 mx-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <div className="flex bg-gray-800/50 rounded-xl p-1 border border-gray-700/50">
                    <button
                        onClick={() => setSelectedMetric('fidelity')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedMetric === 'fidelity'
                            ? 'bg-green-600 text-black'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Fidelity Analysis
                    </button>
                    <button
                        onClick={() => setSelectedMetric('performance')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedMetric === 'performance'
                            ? 'bg-green-600 text-black'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Performance Metrics
                    </button>
                </div>
            </motion.div>


            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <ResultCard result={resultA} side="A" />
                <ResultCard result={resultB} side="B" />
            </motion.div>
            <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <motion.button
                    onClick={() => navigateTo('dashboard')}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                    <RefreshCw size={18} />
                    Run New Comparison
                </motion.button>

                <motion.button
                    onClick={() => navigateTo('results')}
                    className="flex items-center justify-center gap-2 bg-gray-700/50 border border-gray-600/50 text-white font-bold py-3 px-8 rounded-xl hover:bg-gray-600/50 transition-all duration-300"
                >
                    <BarChart3 size={18} />
                    View All Results
                </motion.button>
            </motion.div>

        </div>

    )




}

export default Compare;