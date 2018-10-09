import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { routesCalculator } from './routesFunction';


@Injectable()
export class SettingsService {

 currentSettings: any;

 constructor(
  private injector: Injector,
  private api: ApiService
 ) {   }

loadSettings(): Promise<any> {
 return new Promise((resolve, reject) => {
  setTimeout(() => {
      const router = this.injector.get(Router);
      this.api.getSettings()
      .subscribe(
        response => {
          this.currentSettings = routesCalculator(response)
          this.currentSettings.forEach(element => {
            router.config.push(element);
          });
          resolve(true);
        },
        err => {
          console.log(err);
          reject(false);
        }
      );
   });
  });
 }
}