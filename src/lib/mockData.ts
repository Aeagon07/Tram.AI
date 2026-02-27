export interface RouteData {
    id: string;
    name: string;
    congestion: 'low' | 'medium' | 'high';
    avgSpeed: number;
    incidents: number;
    coordinates: [number, number][]; // Leaflet uses [lat, lng]
}

export interface IncidentData {
    id: string;
    type: 'Accident' | 'Construction' | 'Event' | 'Blocked';
    location: [number, number];
    description: string;
    timestamp: string;
    severity: 'low' | 'medium' | 'high';
}

export const puneRoutes: RouteData[] = [
    {
        id: 'r1',
        name: 'JM Road',
        congestion: 'high',
        avgSpeed: 12,
        incidents: 1,
        coordinates: [
            [18.5204, 73.8496],
            [18.5248, 73.8441],
            [18.5303, 73.8329]
        ]
    },
    {
        id: 'r2',
        name: 'FC Road',
        congestion: 'medium',
        avgSpeed: 25,
        incidents: 0,
        coordinates: [
            [18.5173, 73.8415],
            [18.5273, 73.8415],
            [18.5373, 73.8415]
        ]
    },
    {
        id: 'r3',
        name: 'Pune-Mumbai Highway',
        congestion: 'low',
        avgSpeed: 55,
        incidents: 0,
        coordinates: [
            [18.5807, 73.7431],
            [18.5957, 73.7231],
            [18.6107, 73.7031]
        ]
    }
];

export const activeIncidents: IncidentData[] = [
    {
        id: 'i1',
        type: 'Accident',
        location: [18.5204, 73.8496],
        description: 'Minor collision near Sancheti Hospital',
        timestamp: new Date().toISOString(),
        severity: 'high'
    },
    {
        id: 'i2',
        type: 'Event',
        location: [18.5303, 73.8329],
        description: 'Political rally at Ganeshkhind Road',
        timestamp: new Date().toISOString(),
        severity: 'medium'
    }
];

export const metroStations = [
    { name: 'Shivajinagar', location: [18.5312, 73.8451] },
    { name: 'Deccan Gymkhana', location: [18.5168, 73.8417] },
    { name: 'PCMC', location: [18.6298, 73.7997] }
];
