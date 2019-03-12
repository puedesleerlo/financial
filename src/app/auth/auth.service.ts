import { Injectable, Injector } from '@angular/core';
import { RequestOptions, Response } from '@angular/http';
 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { routesCalculator } from '../routesFunction';
 
@Injectable()
export class AuthService {
    
    API_URL = 'http://localhost/go';
    TOKEN_KEY = 'token';
    currentUser: BehaviorSubject<User> =  new BehaviorSubject({email: "", role: ""});
    constructor(private http: HttpClient, private ds: DataService, private router: Router, private injector: Injector) { }
 
    get token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }
 
    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
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
 
        this.http.post(this.API_URL + '/login', data, headers).subscribe(
            (res: any) => {
                localStorage.setItem(this.TOKEN_KEY, res.token);
                console.log(res.token)
                this.getUserData();
                this.routes()
                this.router.navigateByUrl('/');
            }
        );
    }
 
    getAccount() {
        return this.http.get(this.API_URL + '/account');
    }
    getUserData() {
        this.http.get(this.API_URL + '/user').subscribe((data:User)=> {
            this.currentUser.next(data)
            console.log(data);
        });
    }

    routes() {
        const router = this.injector.get(Router);
        this.ds.setURL(this.API_URL+'/routes')
      this.ds.getData()
      .subscribe(
        response => {
            console.log("response", response)
          var currentSettings = routesCalculator(response)
        //   router.resetConfig(currentSettings)
        //   console.log("router", router)
          currentSettings.forEach(element => {
            router.config.unshift(element);
            console.log("router", router)
          });
        },
        err => {
          console.log(err);
        }
      );
    }
}
export interface User {
    email: string,
    role: string
}