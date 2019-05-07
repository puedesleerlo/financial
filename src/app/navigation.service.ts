import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  COMPANY_KEY = "company"
  company$ = new Subject<string>()
  constructor(private http: HttpClient) { }
  getFormsByCompany() {
    return this.http.get(environment.api + "user")
  }
  updateCompany(company: string) {
    console.log("update company", company)
    localStorage.setItem(this.COMPANY_KEY, company)
    // this.company$.next(company)
  }
  isUserAdmin() {
    return isAdmin(this.getFormsByCompany())
  }
  getCompany() {
    console.log("got company", localStorage.getItem(this.COMPANY_KEY))
    return localStorage.getItem(this.COMPANY_KEY)
  }
}
var isAdmin = map(data => {
      let user = data["user"]
      return user.role === "admin"
  })