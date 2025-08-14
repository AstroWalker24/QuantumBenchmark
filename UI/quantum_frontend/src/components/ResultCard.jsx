import React from "react";
import { AlertTriangle, Clock, Zap, Target, TrendingUp, Cpu, CheckCircle, XCircle } from "lucide-react";
import { motion } from 'framer-motion';
import { getPerformanceScore, getPerformanceColor } from "../utils";

const ResultCard = ({ result, side }) => {
    if (!result) {
        return (
            <motion.div
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl flex items-center justify-center h-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Cpu size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-400 font-medium">Select Backend {side}</p>
                    <p className="text-gray-500 text-sm mt-1">Choose a backend to compare</p>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="bg-gray-900 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${side === 'A' ? 'bg-blue-600/50' : 'bg-purple-600/50'}`}>
                        <span className={`text-xl font-bold ${side === 'A' ? 'text-blue-400' : 'text-purple-400'}`}>
                            {side}
                        </span>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white">{result.backend}</h3>
                        <p className="text-gray-400 text-sm">Quantum Backend</p>
                    </div>
                </div>

                {result.error ? (
                    <div className="flex items-center gap-2 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/30">
                        <XCircle size={16} className="text-red-400" />
                        <span className="text-red-400 text-sm font-medium">Error</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/30">
                        <CheckCircle size={16} className="text-green-400" />
                        <span className="text-green-400 text-sm font-medium">Success</span>
                    </div>
                )}
            </div>

            {result.error ? (
                <div className="space-y-4">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle size={16} className="text-red-400" />
                            <span className="text-red-400 font-medium">Execution Error</span>
                        </div>
                        <p className="text-red-300 text-sm">{result.error}</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-blue-400" />
                                <span className="text-gray-400 text-sm">Execution Time</span>
                            </div>
                            <p className={`text-lg font-mono font-bold ${getPerformanceColor(result.time)}`}>
                                {result.time.toFixed(6)}s
                            </p>
                        </div>

                        <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-green-400" />
                                <span className="text-gray-400 text-sm">Performance</span>
                            </div>
                            <p className="text-lg font-mono font-bold text-green-300">
                                {getPerformanceScore(result.time)} pts
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">Performance Score</span>
                            <span className="text-gray-300 text-sm font-medium">{getPerformanceScore(result.time)}/1000</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                                className={`h-3 rounded-full transition-all duration-500 ${side === 'A' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-purple-600'
                                    }`}
                                style={{ width: `${Math.min((getPerformanceScore(result.time) / 1000) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Target className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-300 font-medium">Statevector Preview</span>
                            <span className="text-gray-500 text-xs">(first 4 elements)</span>
                        </div>
                        <div className="bg-gray-900/80 border border-gray-600/50 rounded-xl p-4 backdrop-blur-sm">
                            <pre className="text-sm text-green-300 overflow-x-auto font-mono">
                                {JSON.stringify(result.statevector.slice(0, 4), null, 2)}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-yellow-400" />
                            <span className="text-gray-300 font-medium">Analysis</span>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Vector Size:</span>
                                <span className="text-white font-mono">{result.statevector.length} elements</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Precision:</span>
                                <span className="text-white font-mono">64-bit</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                <span className="text-green-400 font-medium">Completed</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    )


}

export default ResultCard;