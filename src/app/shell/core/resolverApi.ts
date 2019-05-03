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
    let formname = route.paramMap.get('formname');
    let company = route.paramMap.get('company');
    this.ds.setURL(route.data.api + `${company}/${formname}`);
    console.log(this.ds.getUrl());
    
    var forms2Items = map((val: any) => {
      return val.items
    });
    return forms2Items(this.ds.getData())
  }
}