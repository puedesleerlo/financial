import { Injectable, isDevMode }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject }             from 'rxjs';
import { map, take }              from 'rxjs/operators';
import { DataService } from '../../data.service';
import { FormSample } from 'src/assets/admin.data';
import { FormModel } from 'src/app/models/form.model';

 
@Injectable()
export class FormResolver implements Resolve<any> {
  constructor(private ds: DataService, private router: Router) {}
  sample$:BehaviorSubject<any> = new BehaviorSubject<any>(FormSample["forms"])
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let formname = route.paramMap.get('formname')

    return this.ds.getForm(formname)
  }
}