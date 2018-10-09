import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

// private apiUrl = environment.api;
private apiUrl = "./assets/modules.data.json"

constructor(
 private http: HttpClient
) { }

 public getSettings(): Observable<any> {
//   const url = this.apiUrl + `routes`;
  return this.http.get(this.apiUrl);
 }
}