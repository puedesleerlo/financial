import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DyntableComponent } from './dyntable/dyntable.component';
import { SharedModule } from '../shared/shared.module';
import { ViewsRoutingModule } from './views-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DynvegaComponent } from './dynvega/dynvega.component';
import { DynamicchildsComponent } from './dynamicchilds/dynamicchilds.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ViewsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DyntableComponent, DynvegaComponent, DynamicchildsComponent]
})
export class ViewsModule { }
