import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteListSummary, FavoriteListSummaryResponse } from '../model/FavoriteList'
import { GetScenesResponse } from '../model/Scene'

@Injectable({
  providedIn: 'root',
})
export class FavoriteListService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  /**
   * Get all favorite lists for a user.
   */
  getFavoriteLists(userId: string): Observable<FavoriteListSummaryResponse> {
    const url = `${this.baseUrl}/app/user/${userId}/favoritelist`;
    return this.http.get<FavoriteListSummaryResponse>(url);
  }

  /**
   * Get detailed information for a list of scenes.
   */
  getScenes(sceneIds: string[]): Observable<GetScenesResponse> {
    const url = `${this.baseUrl}/app/scenes/`;
    return this.http.post<GetScenesResponse>(url, { scenes: sceneIds });
  }

  /**
   * Create a new favorite list.
   */
  createFavoriteList(userId: string, listData: { listName: string }): Observable<FavoriteListSummary> {
    const url = `${this.baseUrl}/app/user/${userId}/favoritelist`;
    return this.http.post<FavoriteListSummary>(url, listData);
  }

  /**
   * Delete a favorite list.
   */
  deleteFavoriteList(userId: string, favListId: string): Observable<void> {
    const url = `${this.baseUrl}/app/user/${userId}/favoritelist/${favListId}`;
    return this.http.delete<void>(url);
  }
}
