import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';
import { DataService } from '../../data.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class ResolverApi implements Resolve<any> {
  constructor(private ds: DataService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    let id = route.paramMap.get('id');
    this.ds.addURL("admin/" + id);
    console.log(this.ds.getUrl());
    
    var forms2Items = map((val: any) => {
      return val.items
    });
    return forms2Items(this.ds.getData())
  }
}