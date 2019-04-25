import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { MaterialModule } from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QuestionComponent } from './form/question/question.component';
import { KeysPipe } from './keys.pipe';
import { QuestionDialog } from './form/question-dialog/question-dialog.component';
import { ListComponent } from './list/list.component';
import { LookupDialog } from './form/lookup-dialog/lookup-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FormComponent,
    ListComponent,

  ],
  providers: [],
  declarations: [FormComponent, QuestionComponent, QuestionDialog, LookupDialog, KeysPipe, ListComponent, ],
  entryComponents: [QuestionDialog, LookupDialog]
})
export class SharedModule { }
