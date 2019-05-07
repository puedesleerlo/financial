import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormShellComponent } from './form-shell/form-shell.component';
import { ResolverApi } from './core/resolverApi';
import { AuthRolesGuard } from '../auth/auth.roles.guard';
import { CoreComponent } from './core/core.component';
import { FormResolver } from './form-shell/form.resolver';
import { ItemResolver } from './form-shell/item.resolver';
import { CanActivateViaAuthGuard } from '../auth/auth.guard';
import { CanActivateCompany } from '../auth/companies.interceptor';
const routes:Routes = [
  // {
  //   path: 'admin/:id/:company',
  //   component: CoreComponent,
  //   data: {
  //     roles: ["admin"],
  //     api: "admin/",
  //     apiForm: "form"
  //   },
  //   // canActivate: [AuthRolesGuard],
  //   resolve: {items: ResolverApi, group: FormResolver},
  //   children: [
  //     {
  //       path: "",
  //       component: FormShellComponent,
  //       data: {api: "admin/"},
  //       // resolve: {form: FormResolver},
  //     },
  //     {
  //       path: ":item",
  //       data: {api: "admin/"},
  //       component: FormShellComponent,
  //       resolve: {item: ItemResolver},
  //     }
  //   ]
  // },
  {
    path: 'forms/:company/:formname',
    component: CoreComponent,
    canActivate: [CanActivateCompany],
    resolve: {items: ResolverApi, group: FormResolver}, //Aquí se obtiene el formulario
    children: [
      {
        path: "",
        component: FormShellComponent,
        // resolve: {form: FormResolver},
      },
      {
        path: ":item",
        component: FormShellComponent,
        resolve: {item: ItemResolver}, //Aquí se obtiene el item
      }
    ]
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [FormResolver, 
    ResolverApi, 
    AuthRolesGuard, 
    ItemResolver, 
    CanActivateCompany],
  exports: [RouterModule],
  declarations: []
})
export class ShellRoutingModule { }
