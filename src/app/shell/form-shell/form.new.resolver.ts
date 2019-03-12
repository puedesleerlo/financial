import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';
import { DataService } from '../../data.service';
import { environment } from 'src/environments/environment';

 
@Injectable()
export class FormNewResolver implements Resolve<any> {
  constructor(private ds: DataService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    let id = route.paramMap.get('id');
    this.ds.setURL(environment.api+'routes');
    return this.ds.getData()
  }
}