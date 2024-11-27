import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteListSummaryResponse } from '../model/FavoriteList'
import { GetScenesResponse } from '../model/Scene'

@Injectable({
  providedIn: 'root',
})
export class FavoriteListService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

   /**
   * Get detailed information for a list of scenes.
   */
   getScenes(sceneIds: string[]): Observable<GetScenesResponse> {
    const url = `${this.baseUrl}/app/scenes/`;
    return this.http.post<GetScenesResponse>(url, { scenes: sceneIds });
  }

  /**
   * Get all favorite lists for a user.
   */
  getFavoriteLists(userId: string): Observable<FavoriteListSummaryResponse> {
    const url = `${this.baseUrl}/app/user/${userId}/favoritelist`;
    return this.http.get<FavoriteListSummaryResponse>(url);
  }

   /**
   * Get scenes in the list
   */
  getFavoriteList(userId: string, listId: string): Observable<Record<string, any>>{
    return this.http.get<Record<string, any>>(this.baseUrl+'/app/user/'+userId+'/favoritelist/'+listId);
  }

  /**
   * Add a scene to favorite list.
   */
  addSceneToFavoriteList(userId: string, sceneId: string, listId: string): Observable<GetScenesResponse>{
    const req = {
      sceneId: sceneId,
      listId: listId
    };
    const url = this.baseUrl+'/app/user/'+userId+'/addscene';

    return this.http.patch<GetScenesResponse>(url, req);
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
    const url = `${this.baseUrl}/app/user/${userId}/deleteList/${favListId}`;
    return this.http.delete<Record<string, any>>(url);
  }

  /**
   * Delete a scene from favorite list.
   */
  deleteSceneFromFavoriteList(userId: string, sceneId: string, listId: string){
    const url = `${this.baseUrl}/app/user/${userId}/list/${listId}/deletescene/${sceneId}`;
    return this.http.delete<Record<string, any>>(url);
  }
}
