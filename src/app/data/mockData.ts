export interface Checkpoint {
  id: string;
  name: string;
  km: number;
  status: 'completed' | 'active' | 'upcoming';
  estimatedArrival?: string;
  actualArrival?: string;
  delayMinutes?: number;
  reportedLocation?: string;
  lastUpdated?: string;
}

export interface Trip {
  id: string;
  vehicleNumber: string;
  routeName: string;
  driverName: string;
  status: 'ontime' | 'delayed' | 'early' | 'completed';
  currentCheckpoint: string;
  lastUpdated: string;
  routeId: string;
  tripDay: string;
  startTime: string;
  totalKm: number;
  coveredKm: number;
  remainingKm: number;
  eta: string;
  delayMinutes?: number;
  checkpoints: Checkpoint[];
}

export interface User {
  name: string;
  role: 'admin' | 'operator';
  mobile: string;
}

export const mockTrips: Trip[] = [
  {
    id: 'TRP001',
    vehicleNumber: 'MH-12-AB-1234',
    routeName: 'Mumbai → Pune Express',
    driverName: 'Rajesh Kumar',
    status: 'ontime',
    currentCheckpoint: 'Lonavala Junction',
    lastUpdated: 'Today, 10:45 AM',
    routeId: 'RT-MP-01',
    tripDay: 'Day 1',
    startTime: '08:00 AM',
    totalKm: 148,
    coveredKm: 78,
    remainingKm: 70,
    eta: '12:30 PM',
    checkpoints: [
      {
        id: 'CP1',
        name: 'Mumbai Depot',
        km: 0,
        status: 'completed',
        actualArrival: '08:00 AM',
        lastUpdated: 'Today',
      },
      {
        id: 'CP2',
        name: 'Panvel Toll Plaza',
        km: 42,
        status: 'completed',
        estimatedArrival: '09:15 AM',
        actualArrival: '09:12 AM',
        lastUpdated: 'Today',
      },
      {
        id: 'CP3',
        name: 'Lonavala Junction',
        km: 78,
        status: 'active',
        estimatedArrival: '10:45 AM',
        reportedLocation: 'Near Lonavala Bypass',
        lastUpdated: 'Today',
      },
      {
        id: 'CP4',
        name: 'Talegaon Chowk',
        km: 112,
        status: 'upcoming',
        estimatedArrival: '11:45 AM',
      },
      {
        id: 'CP5',
        name: 'Pune Depot',
        km: 148,
        status: 'upcoming',
        estimatedArrival: '12:30 PM',
      },
    ],
  },
  {
    id: 'TRP002',
    vehicleNumber: 'GJ-01-XY-5678',
    routeName: 'Delhi → Jaipur Highway',
    driverName: 'Suresh Patel',
    status: 'delayed',
    currentCheckpoint: 'Neemrana Fort',
    lastUpdated: 'Today, 09:30 AM',
    routeId: 'RT-DJ-02',
    tripDay: 'Day 1',
    startTime: '06:00 AM',
    totalKm: 280,
    coveredKm: 122,
    remainingKm: 158,
    eta: '02:45 PM',
    delayMinutes: 35,
    checkpoints: [
      {
        id: 'CP1',
        name: 'Delhi Hub',
        km: 0,
        status: 'completed',
        actualArrival: '06:00 AM',
        lastUpdated: 'Today',
      },
      {
        id: 'CP2',
        name: 'Gurgaon Toll',
        km: 28,
        status: 'completed',
        estimatedArrival: '06:45 AM',
        actualArrival: '07:05 AM',
        delayMinutes: 20,
        lastUpdated: 'Today',
      },
      {
        id: 'CP3',
        name: 'Neemrana Fort',
        km: 122,
        status: 'active',
        estimatedArrival: '08:55 AM',
        actualArrival: '09:30 AM',
        delayMinutes: 35,
        reportedLocation: 'Neemrana Industrial Area',
        lastUpdated: 'Today',
      },
      {
        id: 'CP4',
        name: 'Behror Junction',
        km: 158,
        status: 'upcoming',
        estimatedArrival: '10:30 AM',
      },
      {
        id: 'CP5',
        name: 'Shahpura',
        km: 224,
        status: 'upcoming',
        estimatedArrival: '12:15 PM',
      },
      {
        id: 'CP6',
        name: 'Jaipur Depot',
        km: 280,
        status: 'upcoming',
        estimatedArrival: '02:10 PM',
      },
    ],
  },
  {
    id: 'TRP003',
    vehicleNumber: 'KA-03-MN-9012',
    routeName: 'Bangalore → Chennai Corridor',
    driverName: 'Venkatesh Rao',
    status: 'early',
    currentCheckpoint: 'Vellore Station',
    lastUpdated: 'Today, 11:15 AM',
    routeId: 'RT-BC-03',
    tripDay: 'Day 1',
    startTime: '07:30 AM',
    totalKm: 346,
    coveredKm: 212,
    remainingKm: 134,
    eta: '02:00 PM',
    delayMinutes: -15,
    checkpoints: [
      {
        id: 'CP1',
        name: 'Bangalore Hub',
        km: 0,
        status: 'completed',
        actualArrival: '07:30 AM',
        lastUpdated: 'Today',
      },
      {
        id: 'CP2',
        name: 'Hosur Checkpost',
        km: 45,
        status: 'completed',
        estimatedArrival: '08:45 AM',
        actualArrival: '08:35 AM',
        delayMinutes: -10,
        lastUpdated: 'Today',
      },
      {
        id: 'CP3',
        name: 'Krishnagiri Toll',
        km: 86,
        status: 'completed',
        estimatedArrival: '09:40 AM',
        actualArrival: '09:28 AM',
        delayMinutes: -12,
        lastUpdated: 'Today',
      },
      {
        id: 'CP4',
        name: 'Vellore Station',
        km: 212,
        status: 'active',
        estimatedArrival: '11:30 AM',
        actualArrival: '11:15 AM',
        delayMinutes: -15,
        reportedLocation: 'Vellore Bypass Road',
        lastUpdated: 'Today',
      },
      {
        id: 'CP5',
        name: 'Ranipet',
        km: 258,
        status: 'upcoming',
        estimatedArrival: '12:30 PM',
      },
      {
        id: 'CP6',
        name: 'Chennai Depot',
        km: 346,
        status: 'upcoming',
        estimatedArrival: '02:15 PM',
      },
    ],
  },
  {
    id: 'TRP004',
    vehicleNumber: 'TN-22-CD-3456',
    routeName: 'Hyderabad → Vijayawada Route',
    driverName: 'Ravi Shankar',
    status: 'completed',
    currentCheckpoint: 'Vijayawada Depot',
    lastUpdated: 'Yesterday, 05:30 PM',
    routeId: 'RT-HV-04',
    tripDay: 'Day 1',
    startTime: '01:00 PM',
    totalKm: 275,
    coveredKm: 275,
    remainingKm: 0,
    eta: 'Arrived',
    checkpoints: [
      {
        id: 'CP1',
        name: 'Hyderabad Hub',
        km: 0,
        status: 'completed',
        actualArrival: '01:00 PM',
        lastUpdated: 'Yesterday',
      },
      {
        id: 'CP2',
        name: 'Ghatkesar',
        km: 28,
        status: 'completed',
        estimatedArrival: '01:40 PM',
        actualArrival: '01:42 PM',
        lastUpdated: 'Yesterday',
      },
      {
        id: 'CP3',
        name: 'Suryapet Junction',
        km: 142,
        status: 'completed',
        estimatedArrival: '03:30 PM',
        actualArrival: '03:35 PM',
        lastUpdated: 'Yesterday',
      },
      {
        id: 'CP4',
        name: 'Miryalaguda',
        km: 198,
        status: 'completed',
        estimatedArrival: '04:30 PM',
        actualArrival: '04:28 PM',
        lastUpdated: 'Yesterday',
      },
      {
        id: 'CP5',
        name: 'Vijayawada Depot',
        km: 275,
        status: 'completed',
        estimatedArrival: '05:30 PM',
        actualArrival: '05:30 PM',
        lastUpdated: 'Yesterday',
      },
    ],
  },
  {
    id: 'TRP005',
    vehicleNumber: 'UP-16-PQ-7890',
    routeName: 'Lucknow → Kanpur Express',
    driverName: 'Amit Singh',
    status: 'delayed',
    currentCheckpoint: 'Unnao Toll Plaza',
    lastUpdated: 'Today, 02:50 PM',
    routeId: 'RT-LK-05',
    tripDay: 'Day 1',
    startTime: '12:00 PM',
    totalKm: 82,
    coveredKm: 48,
    remainingKm: 34,
    eta: '04:15 PM',
    delayMinutes: 45,
    checkpoints: [
      {
        id: 'CP1',
        name: 'Lucknow Depot',
        km: 0,
        status: 'completed',
        actualArrival: '12:00 PM',
        lastUpdated: 'Today',
      },
      {
        id: 'CP2',
        name: 'Malihabad Chowk',
        km: 28,
        status: 'completed',
        estimatedArrival: '12:40 PM',
        actualArrival: '01:15 PM',
        delayMinutes: 35,
        lastUpdated: 'Today',
      },
      {
        id: 'CP3',
        name: 'Unnao Toll Plaza',
        km: 48,
        status: 'active',
        estimatedArrival: '01:15 PM',
        actualArrival: '02:50 PM',
        delayMinutes: 45,
        reportedLocation: 'Unnao Industrial Area',
        lastUpdated: 'Today',
      },
      {
        id: 'CP4',
        name: 'Kanpur Depot',
        km: 82,
        status: 'upcoming',
        estimatedArrival: '02:10 PM',
      },
    ],
  },
];

export const mockUser: User = {
  name: 'Priya Sharma',
  role: 'operator',
  mobile: '+91 98765 43210',
};
