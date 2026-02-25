<div className="min-h-screen bg-background pb-32">
  {/* Header */}
  <div className="bg-card border-b border-border sticky top-0 z-10">
    <div className="max-w-2xl mx-auto px-4 py-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/trips")}>
          <ArrowLeft className="size-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-foreground">
            {trip?.vehicleNumber}
          </h1>
        </div>
        <StatusBadge status={trip?.status} />
      </div>

      {/* Trip Info */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Route className="size-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground text-xs">Route ID</p>
            <p className="text-foreground font-medium">{trip?.routeId}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground text-xs">Trip Day</p>
            <p className="text-foreground font-medium">{trip?.tripDay}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground text-xs">Start Time</p>
            <p className="text-foreground font-medium">{trip?.startTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground text-xs">Route</p>
            <p className="text-foreground font-medium">{trip?.routeName}</p>
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

  {/* Timeline */}
  <div className="max-w-2xl mx-auto px-4">
    <Card className="p-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Route Progress
      </h2>
      <div className="space-y-0">
        {trip?.checkpoints.map((checkpoint, index) => (
          <TimelineItem
            key={checkpoint.id}
            checkpoint={checkpoint}
            isLast={index === trip?.checkpoints.length - 1}
          />
        ))}
      </div>
    </Card>
  </div>

  {/* Fixed Bottom Summary */}
  <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
    <div className="max-w-2xl mx-auto px-4 py-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Remaining</p>
          <p className="text-lg font-semibold text-foreground">
            {trip?.remainingKm} KM
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Progress</p>
          <p className="text-lg font-semibold text-foreground">
            {trip?.coveredKm}/{trip?.totalKm} KM
          </p>
          <div className="w-full bg-muted rounded-full h-1.5 mt-2">
            <div
              className="bg-primary h-1.5 rounded-full transition-all"
              style={{
                width: `${(trip?.coveredKm / trip?.totalKm) * 100}%`,
              }}
            />
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">ETA</p>
          <p className="text-lg font-semibold text-foreground">{trip?.eta}</p>
          {trip?.delayMinutes !== undefined && trip?.delayMinutes !== 0 && (
            <p
              className={cn(
                "text-xs font-medium mt-1",
                trip?.delayMinutes > 0 ? "text-destructive" : "text-success",
              )}
            >
              {trip?.delayMinutes > 0
                ? `+${trip?.delayMinutes} min`
                : `${trip?.delayMinutes} min`}
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
</div>;
