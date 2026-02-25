/*
 * @Author: Vivek J vsjaiswal@outlook.com
 * @Date: 2026-02-25 13:42:24
 * @LastEditors: Vivek J vsjaiswal@outlook.com
 * @LastEditTime: 2026-02-25 14:32:04
 * @FilePath: /gapps/src/app/types/Trips.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export type TripStatus = "ontime" | "delayed" | "early" | "completed";

export type CheckpointStatus = "completed" | "active" | "upcoming";
export interface Trip {
  id: string;
  vehicleNumber: string;
  routeName: string;
  driverName: string;
  status: TripStatus;

  currentCheckpoint: string;
  lastUpdated: string; // Human-readable string ("Today, 10:45 AM")

  routeId: string;
  tripDay: string;

  startTime: string; // ISO string
  totalKm: number;
  coveredKm: number;
  remainingKm: number;

  eta: string; // ISO string OR "Arrived"
  delayMinutes: number | ""; // because your data mixes types
}
export type UserRole = "operator" | "admin" | "driver";

export interface User {
  name: string;
  role: UserRole;
  mobile: string;
}
export interface VehicleTrackerData {
  trips: Trip[];
  checkpoints: Checkpoint[];
  users: User[];
  routes: VehicleRoute[];
}
export interface Checkpoint {
  tripId: string;
  checkpointId: string;

  name: string;
  km: number | "";

  status: CheckpointStatus | "";

  estimatedArrival: string;
  actualArrival: string;

  delayMinutes: number | null;

  reportedLocation: string;
  lastUpdated: string;
}
export interface VehicleRoute {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  totalKm: number;
}
