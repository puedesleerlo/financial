import { Injectable, Injector } from '@angular/core';
import { RequestOptions, Response } from '@angular/http';
 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { routesCalculator } from '../routesFunction';
import { environment } from 'src/environments/environment';
 
@Injectable()
export class AuthService {
    
    API_URL = environment.api;
    TOKEN_KEY = 'token';
    ROLE_KEY = "role"
    user: any = <any>{}
    currentUser: BehaviorSubject<any> =  new BehaviorSubject({});
    constructor(private http: HttpClient, private ds: DataService, private router: Router, private injector: Injector) { }
 
    get token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }
 
    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    get isAdmin() {
        return localStorage.getItem(this.ROLE_KEY) === "admin"
    }
 
    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigateByUrl('/');
    }
 
    login(email: string, pass: string) {
        const headers = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
        };
 
        const data = {
            email: email,
            password: pass
        };
 
        this.http.post(this.API_URL + 'login', data, headers).subscribe(
            (res: any) => {
                localStorage.setItem(this.TOKEN_KEY, res.account.token);
                localStorage.setItem(this.ROLE_KEY, res.account.role);
                console.log(res)
                this.router.navigateByUrl('/');
            }
        );
    }
 
    getForms() {
        return this.http.get(this.API_URL + '/forms');
    }
}
export interface User {
    email: string,
    role: string
}