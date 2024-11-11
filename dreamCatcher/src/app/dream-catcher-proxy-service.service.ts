import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DreamCatcherProxyServiceService {

  hostUrl:string = 'http://localhost:8080/';

  constructor( private httpClient: HttpClient) { }

  /* API Regarding User*/
  createAccount(userName: string, phone: number, email: string, password: string){
    const req = {
      userId: "",               //will generate userId in backend
      userName: userName,
      phone: phone,
      email: email,
      password: password,
      authorization: "general"  //default authorization is general
    };

    return this.httpClient.post<Record<string, any>>(this.hostUrl+'app/user', req);
  }

  userLogin(loginData: Record<string, string>){
    return this.httpClient.post<Record<string, any>>(this.hostUrl+'app/user/login', loginData);
  }

  getUserInfo(userId: string){
    return this.httpClient.get<Record<string, any>>(this.hostUrl+'app/user/'+userId);
  }

  //updateData only accept userName || phone || email, update user by userId
  updateUserInfo(updateData: Record<string, any>, userId: string){
    return this.httpClient.patch<any[]>(this.hostUrl+'app/user/'+userId, updateData);
  }
  
  /* API Regarding Scene */
  getScenes(){
    return this.httpClient.get<Record<string, any>>(this.hostUrl+'app/scene');
  }

  getSceneById(sceneId: string){
    return this.httpClient.get<Record<string, any>>(this.hostUrl+'app/scene/'+sceneId);
  }

  searchScene(keyword: string){
    return this.httpClient.get<Record<string, any>>(this.hostUrl+'app/scene/search/'+keyword);
  }

  getSceneByIds(sceneIds: string[]){
    return this.httpClient.post<Record<string, any>>(this.hostUrl+'app/scenes', sceneIds);
  }

  /* API Regarding Favorite List */
  getAllFavoriteList(userId: string){
    return this.httpClient.get<Record<string, any>>(this.hostUrl+'/app/user/'+userId+'/favoritelist');
  }

  getFavoriteList(userId: string, listId: string){
    return this.httpClient.get<Record<string, any>>(this.hostUrl+'/app/user/'+userId+'/favoritelist/'+listId);
  }

  addSceneToFavoriteList(userId: string, sceneId: string, listId: string){
    const req = {
      sceneId: sceneId,
      listId: listId
    };
    const url = this.hostUrl+'/app/user/'+userId+'/addscene';

    return this.httpClient.patch<Record<string, any>>(url, req);
  }

  deleteSceneFromFavoriteList(userId: string, sceneId: string, listId: string){
    const req = {
      sceneId: sceneId,
      listId: listId
    };
    const url = this.hostUrl+'/app/user/'+userId+'/deletescene';

    return this.httpClient.patch<Record<string, any>>(url, req);
  }


}
