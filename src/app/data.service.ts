import { Injectable, Type } from '@angular/core';
import { HandleError, HttpErrorHandler } from './shared/http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ActivatedRouteSnapshot } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

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
  getData (): Observable<any[]> {
    return this.http.get<any[]>(this.url)
      .pipe(
        catchError(this.handleError('getData', []))
      );
  }

  /* GET Data whose name contains search term */
  searchData(term: string): Observable<any[]> {
    // console.log(this.url)
    term = term.trim();
    
    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set("_id", term) } : {};
     
    // return this.http.get<any[]>(this.url, options)
    //   .pipe(
    //     catchError(this.handleError<any[]>('searchData', []))
    //   );
    return this.http.get<any[]>(this.url + "/"+ term)
      .pipe(
        catchError(this.handleError<any[]>('searchData', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  addData (data: any): Observable<any> {
    
    console.log(this.url + "/new", data);
    var post = this.http.post<any>(this.url + "/new", data, httpOptions)
    .pipe(
      catchError(this.handleError('addData', data))
    );
    
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
  updateData (id, data: any): Observable<any> {
    console.log(data)
    const url = `${this.url}/${id}`;
    return this.http.post<any>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError('updateData', data))
      );
  } 

  lookupData(url:string, company:string): Observable<any> {
    const urlpath = `${environment.api}lookup`;
    
    return forms2Items(this.http.post(urlpath, 
    encodeURIComponent(url+"?company="+company)))
  }
}
var forms2Items = map((val: any) => {
    // console.log("val",val)
      return val.items
    });