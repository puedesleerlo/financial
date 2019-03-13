import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService} from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthRolesGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isAdmin = this.authenticationService.isAdmin
        return isAdmin;
    }
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     const currentUser = this.authenticationService.currentUser;
    //     var loginSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    //     currentUser.subscribe(user => {
    //         if (user) {
    //             console.log(user)
    //             // check if route is restricted by role
    //             if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
    //                 // role not authorised so redirect to home page
    //                 this.router.navigate(['/']);
    //                 loginSubject.next(false);
    //             }
     
    //             // authorised so return true
    //             loginSubject.next(true);
    //         }
    //         else // not logged in so redirect to login page with the return url
    //         {
    //             this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    //         }
    //     });
    //     return loginSubject;
    // }
}