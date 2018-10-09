import { Component,  Input, OnChanges } from '@angular/core';
import { FormGroup, FormArray} from '@angular/forms';
import { Field } from '../../../models/model';
import { MatDialog} from '@angular/material';
import { QuestionDialog } from '../question-dialog/question-dialog.component';

export interface Question {
  key: string,
  value: {
      initValue: any,
      validationMessages: {
          [key: string]: string
      },
      label: string,
      controlType: string,
      type?: string,
      options?: string[],
  }
}

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnChanges {
  @Input() question: Field;
  @Input() form: FormGroup;
  constructor(public dialog: MatDialog) { 
  }

  get key() {
    return this.question.key
  }

  ngOnChanges() {

  }
  getArrayControl(key) {
    return this.form.get(key);
  }
  getArrayValue(key) {
    return this.getArrayControl(key).value
  }
  deleteArrayItem(index, key) {
    var control = <FormArray>this.getArrayControl(key)
    control.removeAt(index)
  }
  openDialog(question: Field): void {
    let control = <FormArray>this.getArrayControl(question.key);
    console.log(question.value)
    let dialogRef = this.dialog.open(QuestionDialog, {
      width: '250px',
      data: {schema: question.arraySchema}
    });

    dialogRef.afterClosed().subscribe((result:FormGroup) => {
      console.log('The dialog was closed', result);
      control.push(result)
    });
  }
}