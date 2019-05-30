import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateViaAuthGuard } from '../auth/auth.guard';
import { CanActivateCompany } from '../auth/companies.interceptor';
import { ViewsComponent } from './views/views.component';
import { ItemsResolver } from './items.resolver';
import { StructureResolver } from './structure.resolver';
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
    path: 'views/:company/:viewname',
    component: ViewsComponent,
    canActivate: [CanActivateCompany],
    resolve: {structure: StructureResolver}, //Aquí se obtiene el formulario
    // children: [
    //   {
    //     path: "",
    //     component: FormShellComponent,
    //     // resolve: {form: FormResolver},
    //   },
    //   {
    //     path: ":item",
    //     component: FormShellComponent,
    //     resolve: {item: ItemResolver}, //Aquí se obtiene el item
    //   }
    // ]
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ItemsResolver,
    StructureResolver, 
    CanActivateCompany],
  exports: [RouterModule],
  declarations: []
})
export class ViewsRoutingModule { }
