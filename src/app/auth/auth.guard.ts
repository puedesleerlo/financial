import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        console.log(this.authService.isAuthenticated)
        // if(!this.authService.isAuthenticated) this.router.navigate(["/"])

        return true
    }
}