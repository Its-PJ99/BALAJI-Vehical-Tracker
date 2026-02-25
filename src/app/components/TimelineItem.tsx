import { Checkpoint } from "../types/Trips";
import { cn } from "./ui/utils";
import { CheckCircle2, Circle, Navigation2 } from "lucide-react";

interface TimelineItemProps {
  checkpoint: Checkpoint;
  isLast?: boolean;
}

export function TimelineItem({
  checkpoint,
  isLast = false,
}: TimelineItemProps) {
  const getStatusIcon = () => {
    switch (checkpoint.status) {
      case "completed":
        return <CheckCircle2 className="size-5 text-success" />;
      case "active":
        return <Navigation2 className="size-5 text-primary rotate-180" />;
      case "upcoming":
        return <Circle className="size-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (checkpoint.status) {
      case "completed":
        return "bg-success";
      case "active":
        return "bg-primary";
      case "upcoming":
        return "bg-muted-foreground";
    }
  };

  return (
    <div className="flex gap-3">
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0">{getStatusIcon()}</div>
        {!isLast && (
          <div className={cn("w-0.5 h-full min-h-12 mt-2", getStatusColor())} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-base text-foreground">
              {checkpoint.name}
            </h4>
            <p className="text-sm text-muted-foreground mt-0.5">
              {checkpoint.km} KM
            </p>
          </div>
          {checkpoint.estimatedArrival && (
            <span className="text-sm text-muted-foreground">
              {checkpoint.estimatedArrival}
            </span>
          )}
        </div>

        {checkpoint.status === "active" && (
          <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="space-y-1.5">
              {checkpoint.reportedLocation && (
                <p className="text-sm text-foreground">
                  <span className="font-medium">Location:</span>{" "}
                  {checkpoint.reportedLocation}
                </p>
              )}
              {checkpoint.delayMinutes !== null && (
                <p
                  className={cn(
                    "text-sm font-medium",
                    checkpoint.delayMinutes > 0
                      ? "text-destructive"
                      : "text-success",
                  )}
                >
                  {checkpoint.delayMinutes > 0
                    ? `${checkpoint.delayMinutes} min delayed`
                    : checkpoint.delayMinutes < 0
                      ? `${Math.abs(checkpoint.delayMinutes)} min early`
                      : "On time"}
                </p>
              )}
              {checkpoint.lastUpdated && (
                <p className="text-xs text-muted-foreground">
                  Last updated: {checkpoint.lastUpdated}
                </p>
              )}
            </div>
          </div>
        )}

        {checkpoint.status === "completed" && checkpoint.actualArrival && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">
              Arrived: {checkpoint.actualArrival}
              {checkpoint.delayMinutes !== null &&
                checkpoint.delayMinutes !== 0 && (
                  <span
                    className={cn(
                      "ml-2 font-medium",
                      checkpoint.delayMinutes > 0
                        ? "text-destructive"
                        : "text-success",
                    )}
                  >
                    ({checkpoint.delayMinutes > 0 ? "+" : ""}
                    {checkpoint.delayMinutes} min)
                  </span>
                )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
