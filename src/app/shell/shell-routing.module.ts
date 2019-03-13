import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormNewResolver } from './form-shell/form.new.resolver';
import { FormShellComponent } from './form-shell/form-shell.component';
import { ResolverApi } from './core/resolverApi';
import { AuthRolesGuard } from '../auth/auth.roles.guard';
import { environment } from 'src/environments/environment';
import { CoreComponent } from './core/core.component';

const routes = [
  {
    path: 'admin/:id',
    component: CoreComponent,
    data: {
      roles: ["admin"]
    },
    canActivate: [AuthRolesGuard],
    resolve: {items: ResolverApi}
  },
  {
    path: 'forms/:id',
    component: FormShellComponent,
    resolve: {info: FormNewResolver}
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [FormNewResolver, ResolverApi, AuthRolesGuard],
  exports: [RouterModule],
  declarations: []
})
export class ShellRoutingModule { }
