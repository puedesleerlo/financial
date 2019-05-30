import { Injectable, Type } from '@angular/core';
import { HandleError, HttpErrorHandler } from './shared/http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ActivatedRouteSnapshot } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { NavigationService } from './navigation.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = environment.api
  private handleError: HandleError;
  private id = "id"
  constructor(
    private http: HttpClient, 
    public httpErrorHandler: HttpErrorHandler,
    public nvs:NavigationService
    ) {
    this.handleError = this.httpErrorHandler.createHandleError('DataService');
  }

  setURL(url) {
    this.url = environment.api + url
  }

  getUrl() {
    return this.url
  }

  addURL(added) {
    this.url = this.url + added
  }

  setId(id: string) {
    this.id = id
  }

  /** GET heroes from the server */
  getData (formname): Observable<any[]> {
    var company = this.nvs.getCompany()
    const url = environment.forms + company + "/" + formname
    let customMap = mapping("items")
    return customMap(this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getData', []))
      ));
  }
  getDatasourceData (datasource): Observable<any[]> {
    var company = this.nvs.getCompany()
    const url = environment.datasources + company + "/" + datasource
    let customMap = mapping("items")
    return customMap(this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getData', []))
      ));
  }

  getStructure(structure): Observable<any[]> {
    var company = this.nvs.getCompany()
    const url = environment.structures + company + "/" + structure
    let customMap = mapping("structure")
    return customMap(this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getData', []))
      ));
  }

  /* GET Data whose name contains search term */
  getForm(term: string): Observable<any[]> {
    // console.log(this.url)
    term = term.trim();
    var company = this.nvs.getCompany()
    const url = environment.forms + "group/" + company + "/"+ term
    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set("_id", term) } : {};
    let customMap = mapping("group")
    return customMap(this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError<any[]>('searchData', []))
      ));
  }

  getQuestion() {
    const url = environment.forms + "administracion/newform/newquestion"
    // Add safe, URL encoded search parameter if there is a search term
    console.log("holaaaa")
    let customMap = mapping("item")
    return customMap(this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError<any[]>('searchData', []))
      ));
  }

  getItem(formname, term: string): Observable<any[]> {
    // console.log(this.url)
    term = term.trim();
    var company = this.nvs.getCompany()
    const url = environment.forms + company +"/" +formname + "/"+ term
    let customMap = mapping("item")
    return customMap(this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError<any[]>('searchData', []))
      ));
  }
  //////// Save methods //////////

  /** POST: add a new hero to the database */
  addData (formname, data: any): Observable<any> {
    var company = this.nvs.getCompany()
    const url = environment.forms + company + "/"+ formname + "/new"
    console.log("Los datos que se enviarán al servidor serán",url, data);
    var post = this.http.post<any>(url, data, httpOptions)
    .pipe(
      catchError(this.handleError('addData', data)
      ));
    return post
  }

  /** DELETE: delete the Data from the server */
  deleteData (): Observable<{}> {
    const url = `${this.url}/delete`; // DELETE api/Dataes/42
    return this.http.delete(this.url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteData'))
      );
  }

  /** PUT: update the Data on the server. Returns the updated Data upon success. */
  updateData (formname, id, data: any): Observable<any> {
    console.log(data)
    var company = this.nvs.getCompany()
    const url = environment.forms + company + "/"+ formname + "/"+id +  "/new"
    return this.http.post<any>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError('updateData', data))
      );
  } 

  lookupData(url:string, company:string): Observable<any> {
    const urlpath = `${environment.api}lookup`;
    let customMap = mapping("items")
    return customMap(this.http.post(urlpath, 
    encodeURIComponent(url+"?company="+company)))
  }
}
var mapping = function(value) {
return map((val: any) => {
    return val[value]
  });
}