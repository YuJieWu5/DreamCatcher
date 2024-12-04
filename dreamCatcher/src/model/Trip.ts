import { Scene } from "./Scene"

export interface GetTripListResponse {
    success: boolean 
    message: string 
    data: TripSummary[],
    auth: string
}

export interface GetTripResponse {
    success: boolean 
    message: string 
    data: Trip
}

export interface TripSummary {
    tripId: string 
    tripName: string 
    scenes: string[]
    showMenu?: boolean
}

export interface Trip {
    tripId: string 
    tripName: string 
    scenes: Scene[]
    routes: TripRoute[]
}

export interface TripRoute {
    transportation: string 
    timeInSeconds: number 
    distance: number  
}