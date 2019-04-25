import { Component,  Input, OnChanges, isDevMode } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder} from '@angular/forms';
import { Field, Option } from '../../../models/model';
import { MatDialog} from '@angular/material';
import { QuestionDialog } from '../question-dialog/question-dialog.component';
import {FormGroup as FormModel} from "../../../models/form.model"
import { Conditional } from '../../logic.analizer';
import { LookupDialog } from '../lookup-dialog/lookup-dialog.component';

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
  inputControl = new FormControl('')
  imageSrc: string | ArrayBuffer;
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) { 
  }

  get key() {
    return this.question.key
  }
  readURL(event: Evento): void {
    if(isDevMode()) console.log(event.target)
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
    var array = this.getArrayControl(key)
    if(array) return array.value
    else return []
    
  }
  deleteArrayItem(index, key) {
    var control = <FormArray>this.getArrayControl(key)
    control.removeAt(index)
  }
  addItem(key: string,): void {
    if(isDevMode()) console.log("el valor del item en el array es ", this.inputControl.value)
    let control = <FormArray>this.getArrayControl(key);
    let newcontrol = new FormControl(this.inputControl.value)
    control.push(newcontrol)
    this.inputControl.setValue('')
  }
  openArrayDialog(question: Field): void {
    let control = <FormArray>this.getArrayControl(question.key);//Le entrega un form array
    if(isDevMode()) console.log("schema", question.arrayschema) //es un array
    let dialogRef = this.dialog.open(QuestionDialog, {
      width: '450px',
      height: '300px',
      data: {questions: question.arrayschema} //Le entrega un formulario
    });

    dialogRef.afterClosed().subscribe((result:FormGroup) => {
      if(isDevMode()) console.log('The dialog was closed', result);
      if(result) {
        // console.log(control)
        control.push(result)
      }
      
    });
  }
  openArrayItemDialog(question: Field, index:number): void {
    let control = <FormArray>this.getArrayControl(question.key);//Le entrega un form array
    if(isDevMode()) console.log("schema", question.arrayschema) //es un array
    let dialogRef = this.dialog.open(QuestionDialog, {
      width: '450px',
      height: '300px',
      data: {questions: question.arrayschema, item: control.at(index).value} //Le entrega un formulario
    });

    dialogRef.afterClosed().subscribe((result:FormGroup) => {
      if(isDevMode()) console.log('The dialog was closed', result);
      if(result) {
        console.log("El grupo que se cambiará será", control.at(index))
        control.at(index).patchValue(result.value)
      }
      
    });
  }
  openDialog(question: Field, item:any = {}): void {
    if(isDevMode()) console.log("schema", question.arrayschema) //es un array
    let dialogRef = this.dialog.open(QuestionDialog, {
      width: '450px',
      height: '300px',
      data: {questions: question.arrayschema, item} //Le entrega un formulario
    });

    dialogRef.afterClosed().subscribe((result:FormGroup) => {
      if(isDevMode()) console.log('The dialog was closed', result);
      if(result) {
        // console.log(control)
        question.subform = result
      }
      
    });
  }
  openLookupDialog(question: Field, item:any = {}): void {
    // let control = <FormArray>this.getArrayControl(question.key);
    let dialogRef = this.dialog.open(LookupDialog, {
      width: '450px',
      height: '300px',
      data: {lookup: question.lookup} //Le entrega un formulario
    });

    dialogRef.afterClosed().subscribe((result:any[]) => {
      if(isDevMode()) console.log('The dialog was closed', result);
      if(result) {
        this.form.setControl(question.key, this.formBuilder.array(result))
      }
      
    });
  }

  isArrayDisabled(key) {
    // console.log("disabled");
    
    var control = this.form.get(key)
    return control.disabled
  }
  displayFn(field?: FormModel): string | undefined {
    return field ? field.label : undefined;
  }
}
export interface Evento extends Event {
  target: any
}