import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DreamCatcherProxyServiceService {

  hostUrl:string = 'http://localhost:8080/';
  // hostUrl:string = 'https://dream-catcher2024.azurewebsites.net/';

  constructor( private httpClient: HttpClient) { }

  /* API Regarding User*/
  logOut(){
    return this.httpClient.get<Record<string, any>>(this.hostUrl+'logout');
  }

  getUserInfo(){
    return this.httpClient.get<Record<string, any>>(this.hostUrl+'app/user');
  }

  //updateData only accept userName || phone || email, update user by userId
  updateUserInfo(updateData: Record<string, any>){
    return this.httpClient.patch<any[]>(this.hostUrl+'app/user/update', updateData);
  }

  getReview(sceneId: string){
    return this.httpClient.get<Record<string, any>>(this.hostUrl+'app/review/'+sceneId);
  }

  addReview(reviewData: Record<string, string>){
    return this.httpClient.post<Record<string, any>>(this.hostUrl+'app/review', reviewData);
  }
}
