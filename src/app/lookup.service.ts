import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NavigationService } from './navigation.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http:HttpClient, private nvs: NavigationService) { }

  getLuItems(url:string): Observable<any> {
    const urlpath = `${environment.api}lookup`;
    let company = this.nvs.getCompany()
    var customMap = mapping("items")
    return customMap(this.http.post(urlpath, 
    encodeURIComponent(url+"?company="+company)))
  }
}
var mapping = function(value) {
  return map((val: any) => {
      return val[value]
    });
  }