import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { DataService } from '../data.service';



@Injectable()
export class StructureResolver implements Resolve<any> {
  constructor(private ds: DataService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    let viewname = route.paramMap.get('viewname');
    return this.ds.getStructure(viewname)
  }
}