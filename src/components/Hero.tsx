"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Zap, Shield, X, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EarthGlobe from "./EarthGlobe";
import Image from "next/image";

export default function Hero() {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const cityFootage: Record<string, string> = {
        'Pune': '/assets/footage/pune.png',
        'Bengaluru': '/assets/footage/bengaluru.png',
        'Mumbai': '/assets/footage/pune.png',
        'Delhi': '/assets/footage/bengaluru.png',
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-green-50 blur-[120px] opacity-60" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-[120px] opacity-60" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-semibold mb-6"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span>Live in Pune - Smart Traffic Management</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8"
                        >
                            Intelligent Commute <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                                For Modern Cities
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-xl text-xl text-gray-600 mb-10 leading-relaxed"
                        >
                            Tram AI uses real-time multi-modal data to optimize your urban commute,
                            reduce congestion, and handle incidents with precision.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link
                                href="/dashboard"
                                className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center space-x-2 transform hover:-translate-y-1"
                            >
                                <span>Explore Dashboard</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button
                                onClick={() => setSelectedCity('Pune')}
                                className="px-8 py-4 bg-white text-gray-900 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm flex items-center space-x-2"
                            >
                                Watch Pune Live
                            </button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <EarthGlobe onCitySelect={(city) => setSelectedCity(city)} />
                    </motion.div>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
                    {[
                        {
                            icon: MapPin,
                            title: "Multi-Modal Routing",
                            desc: "Seamlessly switch between Metro, Bus, and Private transport.",
                            color: "text-blue-600",
                            bg: "bg-blue-50"
                        },
                        {
                            icon: Zap,
                            title: "Real-time Optimization",
                            desc: "Dynamic rerouting based on live traffic and incident data.",
                            color: "text-amber-600",
                            bg: "bg-amber-50"
                        },
                        {
                            icon: Shield,
                            title: "Incident SOS",
                            desc: "Direct coordination with traffic police for faster response.",
                            color: "text-red-600",
                            bg: "bg-red-50"
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                            className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Live Footage Modal */}
            <AnimatePresence>
                {selectedCity && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full relative"
                        >
                            <button
                                onClick={() => setSelectedCity(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="relative aspect-video bg-gray-900">
                                <Image
                                    src={cityFootage[selectedCity] || '/assets/footage/pune.png'}
                                    alt={`${selectedCity} Traffic`}
                                    fill
                                    className="object-cover opacity-80"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                                        <Play className="w-8 h-8 text-white fill-white" />
                                    </div>
                                </div>
                                {/* Live Overlay UI */}
                                <div className="absolute top-6 left-6 flex space-x-4">
                                    <div className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold rounded uppercase tracking-widest animate-pulse">
                                        LIVE FEED
                                    </div>
                                    <div className="px-3 py-1 bg-black/50 text-white text-[10px] font-bold rounded uppercase tracking-widest backdrop-blur-md">
                                        {selectedCity} NODE: TR-LIVE
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">{selectedCity} Central Hub</h2>
                                        <p className="text-white/70 text-sm max-w-md italic">
                                            Real-time AI analysis of urban traffic density.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-gray-50 flex items-center justify-between">
                                <div className="flex space-x-8">
                                    <div>
                                        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">Density</p>
                                        <p className="text-gray-900 font-bold">Medium-High</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">AI Status</p>
                                        <p className="text-green-600 font-bold">Active</p>
                                    </div>
                                </div>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setSelectedCity(null)}
                                    className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all flex items-center space-x-2"
                                >
                                    <span>Go to Management Console</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
