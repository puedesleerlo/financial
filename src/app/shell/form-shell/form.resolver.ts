import { Injectable }             from '@angular/core';
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
    let id = route.paramMap.get('item');
    let stage = route.parent.paramMap.get('id')
    let sample = FormSample[stage]
    if(id) {
      this.ds.searchData(id).subscribe((res:any) => {
        // console.log(res.form);
        
        sample.questions.forEach(val => {
          // console.log(val);
          val.value = res.form[val.key]
        });
        console.log("resolver", sample);
        this.sample$.next(sample)
        return Observable.create(ob => {
          ob.next(sample)
          ob.complete()
        })
      })
    }
    return Observable.create(ob => {
      ob.next(sample)
      ob.complete()
    })
    // else this.sample$.next(sample)
    // console.log(sample);
    
    // return this.sample$
    

  }
}