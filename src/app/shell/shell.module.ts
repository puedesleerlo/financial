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
import { FormNewResolver } from './form-shell/form.new.resolver';
import { ResolverApi } from './core/resolverApi';
import { environment } from 'src/environments/environment';
import { ShellRoutingModule } from './shell-routing.module';


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
  ],
  declarations: [MenuComponent, CoreComponent, FormShellComponent]
})
export class ShellModule { }
