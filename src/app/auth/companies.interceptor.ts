import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NavigationService } from '../navigation.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CanActivateCompany implements CanActivate {
    constructor(
        private nvs:NavigationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var company = route.paramMap.get("company")
        this.nvs.updateCompany(company)
        if (company == "administracion") {
            var permis = this.nvs.isUserAdmin()
            return permis
        }
        return true
    }
}

