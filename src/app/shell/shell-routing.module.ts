import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormNewResolver } from './form-shell/form.new.resolver';
import { FormShellComponent } from './form-shell/form-shell.component';
import { ResolverApi } from './core/resolverApi';
import { AuthRolesGuard } from '../auth/auth.roles.guard';
import { environment } from 'src/environments/environment';
import { CoreComponent } from './core/core.component';
import { FormResolver } from './form-shell/form.resolver';
const routes:Routes = [
  {
    path: 'admin/:id',
    component: CoreComponent,
    data: {
      roles: ["admin"],
      api: "admin/"
    },
    canActivate: [AuthRolesGuard],
    resolve: {items: ResolverApi},
    children: [
      {
        path: "",
        component: FormShellComponent,
        data: {api: "admin/"},
        resolve: {form: FormResolver},
      },
      {
        path: ":item",
        data: {api: "admin/"},
        component: FormShellComponent,
        resolve: {form: FormResolver},
      }
    ]
  },
  {
    path: 'forms/:id',
    component: CoreComponent,
    data: {
      roles: ["admin"],
      api: "forms/"
    },
    canActivate: [AuthRolesGuard],
    resolve: {items: ResolverApi},
    children: [
      {
        path: "",
        component: FormShellComponent,
        data: {api: "forms/"},
        resolve: {form: FormResolver},
      },
      {
        path: ":item",
        data: {api: "forms/"},
        component: FormShellComponent,
        resolve: {form: FormResolver},
      }
    ]
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [FormResolver, ResolverApi, AuthRolesGuard],
  exports: [RouterModule],
  declarations: []
})
export class ShellRoutingModule { }
