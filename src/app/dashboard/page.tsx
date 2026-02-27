"use client";

import Sidebar from '@/components/Sidebar';
import MapComponent from '@/components/MapComponent';
import { puneRoutes, activeIncidents } from '@/lib/mockData';

export default function Dashboard() {
    return (
        <div className="flex flex-col md:flex-row h-screen pt-20 overflow-hidden bg-white">
            {/* Sidebar - Route Planning & Info */}
            <Sidebar />

            {/* Main Content - Interactive Map */}
            <div className="flex-1 relative">
                <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
                    {/* Status Indicators */}
                    <div className="px-4 py-2 bg-white/90 backdrop-blur rounded-lg shadow-lg border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center space-x-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span>Local Node: Active</span>
                    </div>
                    <div className="px-4 py-2 bg-white/90 backdrop-blur rounded-lg shadow-lg border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center space-x-2">
                        <span>Incidents: {activeIncidents.length} Detected</span>
                    </div>
                </div>

                <MapComponent routes={puneRoutes} incidents={activeIncidents} />
            </div>
        </div>
    );
}
