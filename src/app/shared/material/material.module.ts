import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatPaginatorModule, MatSelectModule, MatDialogModule } from '@angular/material';



@NgModule({
  imports: [],
  exports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule
],
  declarations: []
})
export class MaterialModule {}
