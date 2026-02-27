"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Zap, Shield } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-green-50 blur-[120px] opacity-60" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-[120px] opacity-60" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
                <div className="text-center">
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
                        className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed"
                    >
                        Tram AI uses real-time multi-modal data to optimize your urban commute,
                        reduce congestion, and handle incidents with precision.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <Link
                            href="/dashboard"
                            className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center space-x-2 transform hover:-translate-y-1"
                        >
                            <span>Explore Dashboard</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/about"
                            className="px-8 py-4 bg-white text-gray-900 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm flex items-center space-x-2"
                        >
                            Learn More
                        </Link>
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
        </section>
    );
}
