import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { CoreComponent } from './core/core.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormShellComponent } from './form-shell/form-shell.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [MenuComponent, CoreComponent, FormShellComponent],
  providers: [],
  declarations: [MenuComponent, CoreComponent, FormShellComponent]
})
export class ShellModule { }
