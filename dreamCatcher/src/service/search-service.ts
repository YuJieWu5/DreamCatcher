import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new Subject<string>();
  searchObservable$ = this.searchSubject.asObservable();

  constructor(private http: HttpClient) {}

  setSearchQuery(query: string) {
    this.searchSubject.next(query);
  }

  searchScenes(keyword: string): Observable<any> {
    const url = `http://localhost:8080/app/scene/search/${keyword}`; 
    return this.http.get<any>(url);
  }
}
