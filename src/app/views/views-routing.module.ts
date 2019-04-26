import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DyntableComponent } from './dyntable/dyntable.component';
import { DynamicchildsComponent } from './dynamicchilds/dynamicchilds.component';

const routes: Routes = [
    { path: 'views', component: DynamicchildsComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes) ],
    exports: [ RouterModule]
})
export class ViewsRoutingModule {}