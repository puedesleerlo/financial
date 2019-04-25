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
    // let id = route.paramMap.get('item');
    let formname = route.paramMap.get('formname')
    let company = route.paramMap.get('company')
    let apiForm = route.data.apiForm
    this.ds.setURL(route.data.api + apiForm + "/" + company)
    let customMap = map((val:any) => {
      let form = val[apiForm]
      if(isDevMode()) console.log("esto es lo que se recibe", form);
      
      // if(form.forms) {
      //   form.forms.forEach(form => {
      //     form.questions.forEach(question => {
      //       Object.assign(question, question.custom)
      //     });
      //   });
      // }
      return form
    })
    return customMap(this.ds.searchData(formname))
  }
}