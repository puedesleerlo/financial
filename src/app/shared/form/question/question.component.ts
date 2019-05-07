import { Component,  Input, OnChanges, isDevMode } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder} from '@angular/forms';
import { Field, Option } from '../../../models/model';
import { MatDialog} from '@angular/material';
import { QuestionDialog } from '../question-dialog/question-dialog.component';
import {FormGroup as FormModel} from "../../../models/form.model"
import { Conditional } from '../../logic.analizer';
import { LookupDialog } from '../lookup-dialog/lookup-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/app/lookup.service';
import { debounceTime, switchMap } from 'rxjs/operators';

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
  freeinputControl = new FormControl('')
  inputControl = new FormControl('')
  lookupControl = new FormControl('')
  imageSrc: string | ArrayBuffer;
  filterops = []
  constructor(public dialog: MatDialog, 
    private formBuilder: FormBuilder, 
    public route:ActivatedRoute,
    private lks:LookupService) { 
  }

  get key() {
    return this.question.name
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
    // let option = {name: this.inputControl.value, label: this.inputControl.value}
    let newcontrol = new FormControl(this.inputControl.value)
    control.push(newcontrol)
    this.inputControl.setValue('')
  }
  addFreeItem(key: string,): void {
    if(isDevMode()) console.log("el valor del item en el array es ", this.freeinputControl.value)
    let control = <FormArray>this.getArrayControl(key);
    let option = {name: this.freeinputControl.value, label: this.freeinputControl.value}
    let newcontrol = new FormControl(option)
    control.push(newcontrol)
    this.freeinputControl.setValue('')
  }
  openArrayDialog(question: Field): void {
    let control = this.getArrayControl(question.name) as FormArray;//Le entrega un form array
    if(isDevMode()) console.log("schema", question.arrayschema) //es un array
    let dialogRef = this.dialog.open(QuestionDialog, {
      width: '450px',
      height: '300px',
      data: {questions: question.arrayschema} //Le entrega un formulario
    });

    dialogRef.afterClosed().subscribe((result:FormGroup) => {
      if(isDevMode()) console.log('The dialog was closed', result);
      if(result) {
        console.log("array control", control)
        console.log("array dialog result", result)
        control.push(result)
      }
      
    });
  }
  openArrayItemDialog(question: Field, index:number): void {
    let control = <FormArray>this.getArrayControl(question.name);//Le entrega un form array
    if(isDevMode()) console.log("item in array item dialog", control.at(index)) //es un array
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
    const company =this.route.snapshot.paramMap.get("company")
    console.log("la ruta en lookup es", company)
    // let control = <FormArray>this.getArrayControl(question.key);
    let dialogRef = this.dialog.open(LookupDialog, {
      width: '450px',
      height: '300px',
      data: {lookup: question.lookup, company: company} //Le entrega un formulario
    });

    dialogRef.afterClosed().subscribe((result:any[]) => {
      if(isDevMode()) console.log('The dialog was closed', result);
      if(result) {
        this.form.setControl(question.name, this.formBuilder.array(result))
      }
      
    });
  }

  isArrayDisabled(key) {
    // console.log("disabled");
    
    var control = this.form.get(key)
    return control.disabled
  }
  displayFn(field?: Field): string | undefined {
    return field ? field.label : undefined;
  }

  getLookupData(question:Field) {
    this.lks.getLuItems(question.lookup).subscribe(datos => {
        this.filterops = datos
        console.log("lookup", datos)
    })
  }
}
export interface Evento extends Event {
  target: any
}