import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetScenesResponse } from '../model/Scene'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new Subject<string>();
  searchObservable$ = this.searchSubject.asObservable();
  private baseUrl = 'http://localhost:8080'; 
  // private baseUrl =  'https://dream-catcher2024.azurewebsites.net';

  constructor(private http: HttpClient) {}

  setSearchQuery(query: string) {
    this.searchSubject.next(query);
  }

  searchScenes(keyword: string): Observable<GetScenesResponse> {
    const url = `${this.baseUrl}/app/scene/search/${keyword}`; 
    return this.http.get<GetScenesResponse>(url);
  }

  getAllScenes(): Observable<GetScenesResponse> {
    const url = `${this.baseUrl}/app/scene`; 
    return this.http.get<GetScenesResponse>(url);
  }
}
