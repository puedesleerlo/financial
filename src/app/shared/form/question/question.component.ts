import { Component,  Input, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormControl} from '@angular/forms';
import { Field } from '../../../models/model';
import { MatDialog} from '@angular/material';
import { QuestionDialog } from '../question-dialog/question-dialog.component';
import {FormGroup as FormModel} from "../../../models/form.model"
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
  imageSrc: string | ArrayBuffer;
  constructor(public dialog: MatDialog) { 
  }

  get key() {
    return this.question.key
  }
  readURL(event: Evento): void {
    console.log(event.target)
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(file);
    }
  }

  ngOnChanges() {

  }
  getArrayControl(key) {
    return this.form.get(key) as FormArray;
  }
  getArrayValue(key) {
    return this.getArrayControl(key).value
  }
  deleteArrayItem(index, key) {
    var control = <FormArray>this.getArrayControl(key)
    control.removeAt(index)
  }
  addItem(key: string, info): void {
    let control = <FormArray>this.getArrayControl(key);
    let field = new FormControl(info.value)
    control.push(field)
    info.value = ""
  }
  openDialog(question: Field): void {
    let control = <FormArray>this.getArrayControl(question.key);//Le entrega un form array
    console.log("schema", question.arrayschema) //es un array
    let dialogRef = this.dialog.open(QuestionDialog, {
      width: '250px',
      data: {questions: question.arrayschema} //Le entrega un formulario
    });

    dialogRef.afterClosed().subscribe((result:FormGroup) => {
      console.log('The dialog was closed', result);
      if(result) {
        // console.log(control)
        control.push(result)
      }
      
    });
  }
  displayFn(field?: FormModel): string | undefined {
    return field ? field.name : undefined;
  }
}
export interface Evento extends Event {
  target: any
}