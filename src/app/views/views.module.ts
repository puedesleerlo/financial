import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableShellComponent } from './table-shell/table-shell.component';
import { ViewsComponent } from './views/views.component';
import { MaterialModule } from '../shared/material/material.module';
import { ViewsRoutingModule } from './views-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ViewsRoutingModule
  ],
  declarations: [TableShellComponent, ViewsComponent]
})
export class ViewsModule { }
