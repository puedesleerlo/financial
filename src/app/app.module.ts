import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ShellModule } from './shell/shell.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DataService } from './data.service';
import { HttpErrorHandler } from './shared/http-error-handler.service';
import { FormResolver } from './shell/form-shell/form.resolver';
import { ResolverApi } from './shell/core/resolverApi';
import { ApiService } from './api.service';
import { CoreComponent } from './shell/core/core.component';
import { FormShellComponent } from './shell/form-shell/form-shell.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptorService, HTTPStatus } from './auth/auth.interceptor';
import { ViewsModule } from './views/views.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ShellModule,
    ViewsModule,
    LoginModule,
    HttpClientModule,
    RouterModule.forRoot([
 
    ]),
    BrowserAnimationsModule,

    // AppRoutingModule
  ],
  providers: [DataService, 
    HttpErrorHandler,
    FormResolver,
    ResolverApi,
    ApiService,
    HTTPStatus
    // {
    //  'provide': APP_INITIALIZER,
    //  'useFactory': initSettings,
    //  'deps': [SettingsService],
    //  'multi': true,
    // }
  ],
  entryComponents:[CoreComponent, FormShellComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
