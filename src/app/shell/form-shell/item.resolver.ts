import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject }             from 'rxjs';
import { map, take }              from 'rxjs/operators';
import { DataService } from '../../data.service';
import { FormSample } from 'src/assets/admin.data';
import { FormModel } from 'src/app/models/form.model';

 
@Injectable()
export class ItemResolver implements Resolve<any> {
  constructor(private ds: DataService, private router: Router) {}
  sample$:BehaviorSubject<any> = new BehaviorSubject<any>(FormSample["forms"])
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id = route.paramMap.get('item');
    let stage = route.parent.paramMap.get('id')
    this.ds.setURL(route.data.api+stage)
    let customMap = map((val:any) => {
      let form = val.item
      console.log("esto es lo que se recibe en el componente hijo", form);
      // if(form.forms) {
      //   form.forms.forEach(form => {
      //     form.questions.forEach(question => {
      //       Object.assign(question, question.custom)
      //     });
      //   });
      // }
      return form
    })
    return customMap(this.ds.searchData(id || "newform"))
  }
}