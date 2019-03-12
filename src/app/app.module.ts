import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ShellModule } from './shell/shell.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DataService } from './data.service';
import { HttpErrorHandler } from './shared/http-error-handler.service';
import { SettingsService } from './routing.service';
import { FormResolver } from './shell/form-shell/form.resolver';
import { ResolverApi } from './shell/core/resolverApi';
import { ApiService } from './api.service';
import { CoreComponent } from './shell/core/core.component';
import { FormShellComponent } from './shell/form-shell/form-shell.component';
import { LoginModule } from './login/login.module';

export function initSettings(settings: SettingsService) {
  return () => settings.loadSettings();
 }

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ShellModule,
    LoginModule,
    HttpClientModule,
    RouterModule.forRoot([]),

    // AppRoutingModule
  ],
  providers: [DataService, 
    HttpErrorHandler,
    SettingsService,
    FormResolver,
    ResolverApi,
    ApiService,
    {
     'provide': APP_INITIALIZER,
     'useFactory': initSettings,
     'deps': [SettingsService],
     'multi': true,
    }],
  entryComponents:[CoreComponent, FormShellComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
