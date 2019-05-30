import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';
import { DataService } from '../data.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class ItemsResolver implements Resolve<any> {
  constructor(private ds: DataService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    let datasource = route.paramMap.get('datasource');
    return this.ds.getDatasourceData(datasource)
  }
}