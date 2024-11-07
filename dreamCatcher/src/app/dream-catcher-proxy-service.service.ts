import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DreamCatcherProxyServiceService {

  hostUrl:string = 'http://localhost:8080/';

  constructor( private httpClient: HttpClient) { }

  getScenes(){
    return this.httpClient.get<any[]>(this.hostUrl+'app/scene/');
  }
}
