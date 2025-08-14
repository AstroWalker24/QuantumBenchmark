import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Clock, Zap, Target, BarChart3, Filter, TrendingUp, RefreshCw, Share2, Download, CheckCircle, AlertTriangle, GitCompare, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Logo from '../assets/logos/logo.png';
import { mockResults } from '../utils';


const Results = ({ results, navigateTo }) => {

    const displayResults = results || mockResults;

    const [selectedView, setSelectedView] = useState('chart');
    const [sortBy, setSortBy] = useState('time');

    if (!displayResults) {
        return (
            <div className='w-full min-h-[100dvh] flex flex-col bg-gray-950 overflow-x-hidden'>
                <Navbar logo={Logo} />
                <motion.div
                    className='text-center py-16 max-w-md mx-auto'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className='p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl mt-20'>
                        <div className='w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6'>
                            <Server size={40} className='text-gray-400' />
                        </div>
                        <h2 className='text-2xl font-bold text-white mb-3'>No Results available</h2>
                        <p className='text-gray-400 mb-6'>Run a Benchmark from the Dashboard to see results and detailed analytics</p>
                        <motion.button
                            onClick={() => navigateTo('/dashboard')}
                            className='bg-green-500 text-black font-bold py-3 px-8 rounded-xl hover:bg-green-600 transition-all duration-300 flex items-center gap-2 mx-auto'
                        >
                            <Zap size={18} />
                            Go to Dashboard
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const chartData = displayResults.map(r => ({
        name: r.backend,
        'Execution Time (s)': parseFloat(r.time.toFixed(4)),
        'Performance Score': r.error ? 0 : Math.round((1 / r.time) * 1000)
    }));

    const pieData = displayResults.map(r => ({
        name: r.backend,
        value: r.error ? 0 : parseFloat(r.time.toFixed(4)),
        color: r.error ? '#ef4444' : ['#3b82f6', '#8b5cf6', '#10b981'][Math.floor(Math.random() * 3)]
    }));

    const sortedResults = [...displayResults].sort((a, b) => {
        if (sortBy === 'time') return a.time - b.time;
        if (sortBy === 'name') return a.backend.localeCompare(b.backend);
        return 0;
    });

    const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];


    return (
        <div className='w-full min-h-[100dvh] flex flex-col bg-gray-950 overflow-x-hidden'>
            <Navbar logo={Logo} />

            <motion.div
                className='mt-30 mx-10'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    className='flex flex-col items-start mb-8 gap-4'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className='flex flex-row justify-between w-full'>
                        <div>
                            <div className='flex items-center gap-3 mb-2'>
                                <div className="p-3 bg-white rounded-xl">
                                    <BarChart3 className="w-5 h-5 text-black" />
                                </div>
                                <h1 className="text-4xl font-bold text-white">
                                    Benchmark Results
                                </h1>
                            </div>
                            <p className="text-gray-400 text-lg mt-2">Performance analysis across {displayResults.length} quantum simulators</p>
                        </div>

                        <div className='flex items-center gap-3'>
                            <motion.button
                                onClick={() => navigateTo('compare')}
                                className='flex items-center gap-2 bg-transparent text-white font-bold py-3 px-6 rounded-xl hover:bg-green-600 hover:text-black transition-all duration-300 cursor-pointer border border-green-500'
                            >
                                <GitCompare size={18} />
                                <span>Detailed Comparision</span>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className='bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6'>
                        <div className='flex items-center gap-3'>
                            <div className="p-2 bg-white rounded-lg">
                                <Clock className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Fastest Time</p>
                                <p className="text-2xl font-bold text-white">
                                    {Math.min(...displayResults.filter(r => !r.error).map(r => r.time)).toFixed(4)}s
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 border border-green-500/30 rounded-xl p-6 backdrop-blur-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg">
                                <CheckCircle className="w-5 h-5 text-black-500" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Success Rate</p>
                                <p className="text-2xl font-bold text-white">
                                    {Math.round((displayResults.filter(r => !r.error).length / displayResults.length) * 100)}%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg">
                                <TrendingUp className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Avg. Performance</p>
                                <p className="text-2xl font-bold text-white">
                                    {Math.round(displayResults.filter(r => !r.error).reduce((acc, r) => acc + (1 / r.time), 0) / displayResults.filter(r => !r.error).length)} pts
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg">
                                <Target className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Backends</p>
                                <p className="text-2xl font-bold text-white">{displayResults.length}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className='flex items-center gap-4 mb-6'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className='flex bg-gray-800/50 rounded-xl p-1 border border-gray-700/50'>
                        <button
                            onClick={() => setSelectedView('chart')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedView === 'chart'
                                ? 'bg-green-600 text-black shadow-lg'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Bar Chart
                        </button>
                        <button
                            onClick={() => setSelectedView('line')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedView === 'line'
                                ? 'bg-green-600 text-black shadow-lg'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Line Chart
                        </button>
                        <button
                            onClick={() => setSelectedView('pie')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedView === 'pie'
                                ? 'bg-green-600 text-black shadow-lg'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Pie Chart
                        </button>
                    </div>

                    <div className="flex ml-4 items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-800/50 border border-gray-700/50 text-white rounded-lg px-3 py-2 text-sm cursor-pointer"
                        >
                            <option value="time">Sort by Time</option>
                            <option value="name">Sort by Name</option>
                        </select>
                    </div>
                </motion.div>

                <motion.div
                    className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className='bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6'>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-white" />
                            Performance Visualization
                        </h3>

                        {selectedView === 'chart' && (
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                                    <XAxis dataKey="name" stroke="#A0AEC0" />
                                    <YAxis stroke="#A0AEC0" tickFormatter={(tick) => tick.toFixed(3)} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            border: '1px solid #4b5563',
                                            color: '#e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                                        }}
                                    />
                                    <Legend wrapperStyle={{ color: '#e5e7eb' }} />
                                    <Bar dataKey="Execution Time (s)" fill="url(#greenGradient)" radius={[4, 4, 0, 0]} />
                                    <defs>
                                        <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#72e05c" />
                                            <stop offset="100%" stopColor="#1cb319" />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        )}


                        {selectedView === 'line' && (
                            <ResponsiveContainer width='100%' height={400}>
                                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                                    <XAxis dataKey="name" stroke="#A0AEC0" />
                                    <YAxis stroke="#A0AEC0" tickFormatter={(tick) => tick.toFixed(3)} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            border: '1px solid #4b5563',
                                            color: '#e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                                        }}
                                    />
                                    <Legend wrapperStyle={{ color: '#e5e7eb' }} />
                                    <Line
                                        type="monotone"
                                        dataKey="Execution Time (s)"
                                        stroke="#22e074"
                                        strokeWidth={3}
                                        dot={{ fill: '#158244', strokeWidth: 2, r: 6 }}
                                        activeDot={{ r: 8, stroke: '#158244', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}

                        {selectedView === 'pie' && (
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={120}
                                        fill="#33d64c"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            border: '1px solid #4b5563',
                                            color: '#e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    <div className='bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6'>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            Detailed Results
                        </h3>
                        <div className='space-y-4 max-h-96 overflow-y-auto'>
                            {sortedResults.map((res, index) => (
                                <motion.div
                                    key={index}
                                    className='bg-gray-700/30 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${res.error ? 'bg-red-400' : 'bg-green-400'}`}></div>
                                            <span className="font-bold text-lg text-white">{res.backend}</span>
                                        </div>
                                        {res.error ? (
                                            <span className="text-red-400 flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-lg">
                                                <AlertTriangle size={14} /> Error
                                            </span>
                                        ) : (
                                            <span className="text-green-400 flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-lg">
                                                <CheckCircle size={14} /> Success
                                            </span>
                                        )}
                                    </div>

                                    {!res.error && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400 text-sm">Execution Time:</span>
                                                <span className="font-mono text-blue-300 font-bold">{res.time.toFixed(4)}s</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400 text-sm">Performance Score:</span>
                                                <span className="font-mono text-green-300 font-bold">{Math.round((1 / res.time) * 1000)} pts</span>
                                            </div>
                                            <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${Math.min((1 / res.time) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                    {res.error && (
                                        <p className="text-red-300 text-sm mt-2">{res.error}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className='flex flex-col sm:flex-row gap-4 justify-center mb-10'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <motion.button
                        onClick={() => navigateTo('dashboard')}
                        className="flex items-center justify-center gap-2 bg-transparent text-white font-bold py-3 border border-green-500 px-8 rounded-xl hover:bg-green-500 hover:text-black transition-all duration-300"
                    >
                        <RefreshCw size={18} />
                        Run New Benchmark
                    </motion.button>

                    <motion.button
                        onClick={() => navigateTo('compare')}
                        className="flex items-center justify-center gap-2 bg-green-500  text-black font-bold py-3 px-8 rounded-xl hover:bg-transparent hover:text-white hover:border hover:border-green-500 transition-all duration-300"
                    >
                        <GitCompare size={18} />
                        Advanced Comparison
                    </motion.button>
                </motion.div>

            </motion.div>
        </div>
    )
}

export default Results;