"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { RouteData, IncidentData, metroStations } from '@/lib/mockData';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function MapComponent({
    routes,
    incidents
}: {
    routes: RouteData[],
    incidents: IncidentData[]
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [L, setL] = useState<any>(null);

    useEffect(() => {
        setIsMounted(true);
        // Import Leaflet directly for icon configuration
        import('leaflet').then(leaflet => {
            setL(leaflet);
            // Fix for default marker icons in Leaflet + Next.js
            delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
            leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            });
        });
    }, []);

    if (!isMounted || !L) return <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center">Loading Map...</div>;

    const getRouteColor = (congestion: string) => {
        switch (congestion) {
            case 'high': return '#ef4444'; // red-500
            case 'medium': return '#f59e0b'; // amber-500
            default: return '#10b981'; // emerald-500
        }
    };

    return (
        <div className="h-full w-full">
            <MapContainer
                center={[18.5204, 73.8567]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Routes */}
                {routes.map(route => (
                    <Polyline
                        key={route.id}
                        positions={route.coordinates}
                        pathOptions={{
                            color: getRouteColor(route.congestion),
                            weight: 6,
                            opacity: 0.8
                        }}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-lg">{route.name}</h3>
                                <p className="text-sm">Avg Speed: {route.avgSpeed} km/h</p>
                                <p className="text-sm capitalize">Congestion: {route.congestion}</p>
                            </div>
                        </Popup>
                    </Polyline>
                ))}

                {/* Incidents */}
                {incidents.map(incident => (
                    <Marker key={incident.id} position={incident.location}>
                        <Popup>
                            <div className="p-2">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-600 mb-2 inline-block">
                                    {incident.type}
                                </span>
                                <h3 className="font-bold">{incident.description}</h3>
                                <p className="text-xs text-gray-500 mt-1">{new Date(incident.timestamp).toLocaleTimeString()}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Metro Stations */}
                {metroStations.map((station, i) => (
                    <Marker
                        key={i}
                        position={station.location as [number, number]}
                        icon={new L.Icon({
                            iconUrl: 'https://cdn-icons-png.flaticon.com/512/1000/1000966.png', // Metro icon
                            iconSize: [25, 25],
                        })}
                    >
                        <Popup>
                            <div className="p-1 font-semibold">{station.name} Metro Station</div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
