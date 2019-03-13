import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';
import { DataService } from '../../data.service';
import { FormSample } from 'src/assets/admin.data';

 
@Injectable()
export class FormResolver implements Resolve<any> {
  constructor(private ds: DataService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let id = route.paramMap.get('item');
    let stage = route.parent.paramMap.get('id')
    let sample = FormSample[stage]
    if(id) {
      let fields = sample.model.fields.model
      let keys = Object.keys(sample.model.fields.model)
      this.ds.searchData(id).subscribe(data => {
        keys.forEach(val => {
          fields[val].value = data
        })
      })
    }
    
    // return Observable.create(ob => ob.next(FormSample[stage]))
    return FormSample[stage]

  }
}