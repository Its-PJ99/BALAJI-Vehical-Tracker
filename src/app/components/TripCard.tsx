import { Card } from './ui/card';
import { StatusBadge } from './StatusBadge';
import { Clock, User, Navigation } from 'lucide-react';
import { Trip } from '../data/mockData';
import { Link } from 'react-router';

interface TripCardProps {
  trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
  return (
    <Link to={`/trip/${trip.id}`} className="block">
      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-base text-foreground">{trip.vehicleNumber}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{trip.routeName}</p>
          </div>
          <StatusBadge status={trip.status} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="size-4 text-muted-foreground" />
            <span className="text-foreground">{trip.driverName}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Navigation className="size-4 text-muted-foreground" />
            <span className="text-foreground">{trip.currentCheckpoint}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">{trip.lastUpdated}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}