import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { StatusBadge } from "../components/StatusBadge";
import { TimelineItem } from "../components/TimelineItem";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Route,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import fetchData from "../api/fetch.data";
import { VehicleTrackerData } from "../types/Trips";

export default function TripDetailScreen() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<VehicleTrackerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  useEffect(() => {
    fetchData(
      "https://script.google.com/macros/s/AKfycbwDmLoYz8Ca1icqVVn4874ultLjyRGsLYuhWUm5uMdY4LTNyXfLXNskCjahKgNyPibG/exec",
    )
      .then((res: VehicleTrackerData) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const trip = data?.trips.find((t) => t.id === tripId);

  const checkpoints = data?.checkpoints
    .filter((cp) => cp.tripId === tripId)
    .filter((cp) => cp.checkpointId);

  const formatTime = (iso?: string) => {
    if (!iso || iso === "Arrived") return iso;
    return new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading trip...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-lg font-semibold">Trip not found</h2>
          <Button onClick={() => navigate("/trips")}>Back to Trips</Button>
        </div>
      </div>
    );
  }

  const progress = trip.totalKm > 0 ? (trip.coveredKm / trip.totalKm) * 100 : 0;

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-card border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/trips")}
            >
              <ArrowLeft className="size-5" />
            </Button>

            <div className="flex-1">
              <h1 className="text-xl font-semibold">{trip.vehicleNumber}</h1>
              <p className="text-sm text-muted-foreground">{trip.routeName}</p>
            </div>

            <StatusBadge status={trip.status} />
          </div>

          {/* Trip Meta Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex gap-2 items-start">
              <Route className="size-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Route ID</p>
                <p className="font-medium">{trip.routeId}</p>
              </div>
            </div>

            <div className="flex gap-2 items-start">
              <Calendar className="size-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Trip Day</p>
                <p className="font-medium">{trip.tripDay}</p>
              </div>
            </div>

            <div className="flex gap-2 items-start">
              <Clock className="size-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Start Time</p>
                <p className="font-medium">{formatTime(trip.startTime)}</p>
              </div>
            </div>

            <div className="flex gap-2 items-start">
              <MapPin className="size-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Current Location
                </p>
                <p className="font-medium">{trip.currentCheckpoint}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <Card className="overflow-hidden">
          <button
            onClick={() => setIsMapExpanded(!isMapExpanded)}
            className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-primary" />
              <span className="font-medium text-foreground">Route Map</span>
            </div>
            {isMapExpanded ? (
              <ChevronUp className="size-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-5 text-muted-foreground" />
            )}
          </button>

          {isMapExpanded && (
            <div className="border-t border-border">
              <div className="aspect-video bg-muted relative overflow-hidden">
                {/* Simplified map visualization */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="w-full h-full relative">
                    {/* Route line */}
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 10,50 Q 30,30 50,50 T 90,50"
                        fill="none"
                        stroke="#1565C0"
                        strokeWidth="2"
                        opacity="0.5"
                      />
                    </svg>

                    {/* Checkpoints */}
                    <div className="absolute left-[10%] top-[50%] -translate-y-1/2">
                      <div className="size-3 bg-success rounded-full" />
                    </div>
                    <div className="absolute left-[35%] top-[30%] -translate-y-1/2">
                      <div className="size-3 bg-success rounded-full" />
                    </div>
                    <div className="absolute left-[50%] top-[50%] -translate-y-1/2">
                      <div className="size-4 bg-primary rounded-full animate-pulse" />
                    </div>
                    <div className="absolute left-[70%] top-[50%] -translate-y-1/2">
                      <div className="size-3 bg-muted-foreground rounded-full" />
                    </div>
                    <div className="absolute left-[90%] top-[50%] -translate-y-1/2">
                      <div className="size-3 bg-muted-foreground rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 bg-card/95 backdrop-blur-sm rounded-lg p-2 shadow-sm">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 bg-success rounded-full" />
                      <span className="text-muted-foreground">Completed</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">Active</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 bg-muted-foreground rounded-full" />
                      <span className="text-muted-foreground">Upcoming</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
      {/* Progress Card */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Card className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Progress</p>
              <p className="font-semibold">
                {trip.coveredKm} / {trip.totalKm} KM
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="font-semibold">{trip.remainingKm} KM</p>
            </div>
          </div>

          <div className="w-full bg-muted h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-sm pt-2">
            <div>
              <p className="text-xs text-muted-foreground">ETA</p>
              <p className="font-medium">{formatTime(trip.eta)}</p>
            </div>

            {typeof trip.delayMinutes === "number" &&
              trip.delayMinutes !== 0 && (
                <div
                  className={cn(
                    "text-sm font-medium",
                    trip.delayMinutes > 0
                      ? "text-destructive"
                      : "text-green-600",
                  )}
                >
                  {trip.delayMinutes > 0
                    ? `+${trip.delayMinutes} min delayed`
                    : `${trip.delayMinutes} min early`}
                </div>
              )}
          </div>
        </Card>
      </div>
      {/* Timeline */}
      <div className="max-w-2xl mx-auto px-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Route Progress
          </h2>
          <div className="space-y-0">
            {checkpoints?.map((checkpoint, index) => (
              <TimelineItem
                key={checkpoint.tripId}
                checkpoint={checkpoint}
                isLast={index === checkpoints.length - 1}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
