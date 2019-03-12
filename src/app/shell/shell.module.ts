import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { CoreComponent } from './core/core.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormShellComponent } from './form-shell/form-shell.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/auth.interceptor';
import { CanActivateViaAuthGuard } from '../auth/auth.guard';
import { AuthRolesGuard } from '../auth/auth.roles.guard';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [MenuComponent, CoreComponent, FormShellComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
  },
  CanActivateViaAuthGuard,
  AuthRolesGuard
  ],
  declarations: [MenuComponent, CoreComponent, FormShellComponent]
})
export class ShellModule { }
