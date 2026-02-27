"use client";

import { useState } from 'react';
import { Search, Info, AlertTriangle, TrendingUp, DollarSign, Train } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [showResults, setShowResults] = useState(false);

    const handleSearch = () => {
        if (origin && destination) setShowResults(true);
    };

    return (
        <div className="w-full md:w-96 bg-white h-full border-r border-gray-200 flex flex-col shadow-xl z-20 overflow-y-auto">
            <div className="p-6 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Route Planner</h2>
                    <p className="text-gray-500 text-sm">Find the fastest and cheapest commute.</p>
                </div>

                {/* Search Form */}
                <div className="space-y-4">
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                            <div className="w-2 h-2 rounded-full border-2 border-green-500" />
                        </span>
                        <input
                            type="text"
                            placeholder="Enter Origin"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                            <MapPin className="w-4 h-4 text-red-500" />
                        </span>
                        <input
                            type="text"
                            placeholder="Enter Destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                    >
                        <Search className="w-4 h-4" />
                        <span>Search Routes</span>
                    </button>
                </div>

                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 pt-6 border-t border-gray-100"
                    >
                        {/* Multi-modal Suggestion */}
                        <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                            <div className="flex items-center space-x-2 text-green-700 font-bold mb-2">
                                <TrendingUp className="w-4 h-4" />
                                <span>Optimized Suggestion</span>
                            </div>
                            <p className="text-sm text-green-800 mb-4">
                                Drive to <strong>Shivajinagar Metro</strong>, then take Line 1 to destination.
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-green-700 uppercase tracking-wider">
                                <div className="flex items-center space-x-1">
                                    <span className="opacity-60 text-[10px]">Time</span>
                                    <span>22 Mins</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span className="opacity-60 text-[10px]">Saving</span>
                                    <span>Rs. 45</span>
                                </div>
                            </div>
                        </div>

                        {/* Fare Comparison */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center space-x-2">
                                <DollarSign className="w-4 h-4" />
                                <span>Estimate Comparison</span>
                            </h3>
                            <div className="space-y-3">
                                <div className="relative h-12 flex items-center px-4 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                                    <div className="absolute left-0 bottom-0 h-1 bg-gray-400 w-[80%]" />
                                    <div className="flex-1 flex justify-between items-center relative z-10">
                                        <span className="text-sm font-medium text-gray-600">Fuel Cost (Private)</span>
                                        <span className="font-bold text-gray-900">₹ 85.00</span>
                                    </div>
                                </div>
                                <div className="relative h-12 flex items-center px-4 bg-green-50 rounded-lg border border-green-100 overflow-hidden">
                                    <div className="absolute left-0 bottom-0 h-1 bg-green-500 w-[30%]" />
                                    <div className="flex-1 flex justify-between items-center relative z-10">
                                        <span className="text-sm font-medium text-green-700 flex items-center">
                                            <Train className="w-3 h-3 mr-1" />
                                            Metro Fare
                                        </span>
                                        <span className="font-bold text-green-700">₹ 30.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Live Alerts */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                <span>Route Alerts</span>
                            </h3>
                            <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-800 leading-relaxed">
                                Heavy congestion reported on JM Road. Rerouting via Ferguson College Rd suggested.
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="mt-auto p-6 bg-gray-50 border-t border-gray-100">
                <button className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-red-200">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Report Emergency / SOS</span>
                </button>
            </div>
        </div>
    );
}

// Adding missing imports for the above components
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
