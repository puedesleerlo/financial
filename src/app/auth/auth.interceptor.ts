import { Injectable, Injector, isDevMode } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { map, catchError, finalize, tap } from 'rxjs/operators';
 
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
 
    constructor(private injector: Injector, private snackBar: MatSnackBar) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthService);
        if(isDevMode()) console.log(req)
        const authRequest = req.clone({
            // tslint:disable-next-line:max-line-length
            headers: req.headers.set('Authorization', 'Bearer ' + authService.token)
        });
 
        return next.handle(authRequest).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                   
                  if(isDevMode()) console.log(" all looks good", event);
                  // http response status code
                  if(event.body.status) this.showFlow(event.body.message)
                  else {
                    if(isDevMode()) console.log("event", event)
                    this.showError(event.body.message)}
                  // shows success snackbar with green background
                  //this.snackBar.openSnackBar(event.statusText,'Close','green-snackbar');
                }
              }, error => {
                 // http response status code
                 var jsonError = JSON.parse(error.error.text)
                 if(isDevMode()) console.log("show error message", jsonError);
                    // show error snackbar with red background
                    
                    this.showError(jsonError["message"])
  
              })
            );
    }
    showError(message: string){
        const config = new MatSnackBarConfig();
      config.panelClass = ['background-red'];
      config.duration = 5000;
      this.snackBar.open(message, 'Oh no!', config);
    }
    showFlow(message: string){
        const config = new MatSnackBarConfig();
      config.panelClass = ['background-green'];
      config.duration = 2000;
      this.snackBar.open(message, 'Excelente', config);
    }
}