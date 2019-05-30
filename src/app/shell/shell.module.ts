import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { CoreComponent } from './core/core.component';
import { SharedModule } from '../shared/shared.module';
import { FormShellComponent } from './form-shell/form-shell.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/auth.interceptor';
import { ShellRoutingModule } from './shell-routing.module';
import { ExcelService } from '../utils/excel.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ShellRoutingModule
  ],
  exports: [MenuComponent, CoreComponent, FormShellComponent, ShellRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
  },
  ExcelService
  ],
  declarations: [MenuComponent, CoreComponent, FormShellComponent]
})
export class ShellModule { }
