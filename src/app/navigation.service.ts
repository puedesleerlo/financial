import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  COMPANY_KEY = "company"
  constructor(private http: HttpClient) { }
  getFormsByCompany() {
    return this.http.get(environment.api + "user")
  }
  updateCompany(company: string) {
    console.log("update company", company)
    localStorage.setItem(this.COMPANY_KEY, company)
  }
  getCompany() {
    console.log("got company", localStorage.getItem(this.COMPANY_KEY))
    return localStorage.getItem(this.COMPANY_KEY)
  }
}
