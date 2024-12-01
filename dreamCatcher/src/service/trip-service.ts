import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetTripListResponse, GetTripResponse, TripRoute } from '../model/Trip';


@Injectable({
  providedIn: 'root'
})
export class TripService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  /* Create new Trip */
  createTrip(userId: string, tripName: string){
    const url = `${this.baseUrl}/app/trip/`;
    const data = {
        userId: userId,
        tripId: '',
        tripName: tripName,
        scenes: [],
        routes: []
    }
    return this.http.post<Record<string, any>>(url, data);
  }

  /* Delete Trip by tripId */
  deleteTrip(tripId: string){
    const url = `${this.baseUrl}/app/trip/${tripId}/delete`;
    return this.http.delete<Record<string, any>>(url);
  }

  /* Get trips by userId */
  getUserTrips(userId: string): Observable<GetTripListResponse>{
    const url = `${this.baseUrl}/app/user/${userId}/trip`
    return this.http.get<GetTripListResponse>(url);
  }

  /* Get one trip by tripId */
  getSelectedTrip(tripId: string): Observable<Record<string, any>> {
    const url = `${this.baseUrl}/app/trip/${tripId}`
    return this.http.get<Record<string, any>>(url);
  }

  /* Update trip by tripId */
  updateTrip(tripId: string, data: any) {
    const url = `${this.baseUrl}/app/trip/${tripId}`;
    return this.http.patch<Record<string, any>>(url, data);
  }

  /* add scene to trip */
  addSceneToTrip(tripId: string, sceneId: string){
    const url = `${this.baseUrl}/app/trip/${tripId}/addscene`;
    const data = {sceneId: sceneId};
    return this.http.patch<Record<string, any>>(url, data);
  }

  /* delete scene to trip */
  deleteSceneFromTrip(tripId: string, sceneId: string){
    const url = `${this.baseUrl}/app/trip/${tripId}/deletescene/${sceneId}`;
    return this.http.delete<Record<string, any>>(url);
  }

   /* Get detailed information for a list of scenes */
  getScenes(sceneIds: string[]){
    const url = `${this.baseUrl}/app/scenes/`;
    return this.http.post<Record<string, any>>(url, { scenes: sceneIds });
  }
}
