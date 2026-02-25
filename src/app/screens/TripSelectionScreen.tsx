import { useState, useMemo } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { TripCard } from '../components/TripCard';
import { RoleBadge } from '../components/RoleBadge';
import { mockTrips, mockUser } from '../data/mockData';
import { Search, LogOut, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function TripSelectionScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'delayed' | 'completed'>('all');

  const filteredTrips = useMemo(() => {
    let trips = mockTrips;

    // Apply search filter
    if (searchQuery) {
      trips = trips.filter((trip) =>
        trip.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filter === 'delayed') {
      trips = trips.filter((trip) => trip.status === 'delayed');
    } else if (filter === 'completed') {
      trips = trips.filter((trip) => trip.status === 'completed');
    }

    return trips;
  }, [searchQuery, filter]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Active Trips</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{mockUser.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <RoleBadge role={mockUser.role} />
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="size-5" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by vehicle number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'delayed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('delayed')}
          >
            Delayed
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Trip List */}
      <div className="max-w-2xl mx-auto px-4 pb-6 space-y-3">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No trips found</p>
          </div>
        )}
      </div>
    </div>
  );
}