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
  createFavoriteList(userId: string, listName: string){
    console.log("calling create favorite list");
    const data = {
      userId: userId,
      listName: listName
    };
    return this.http.post<Record<string, any>>(this.baseUrl+'/app/user/addList', data);
  }

  /**
   * Delete a favorite list.
   */
  deleteFavoriteList(userId: string, favListId: string){
    const data = {
      userId: userId,
      listId: favListId
    }
    const url = `${this.baseUrl}/app/user/deleteList`;
    return this.http.post<Record<string, any>>(url, data);
  }

  /**
   * Delete a scene from favorite list.
   */
  deleteSceneFromFavoriteList(userId: string, sceneId: string, listId: string){
    const req = {
      sceneId: sceneId,
      listId: listId
    };
    const url = this.baseUrl+'/app/user/'+userId+'/deletescene';

    return this.http.patch<Record<string, any>>(url, req);
  }
}
