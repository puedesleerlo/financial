import { Component, OnInit, Input, Output, EventEmitter, OnChanges, isDevMode } from '@angular/core';
import { Form } from './form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormModel } from 'src/app/models/form.model';
import { Model, Field } from 'src/app/models/model';
import * as _ from "lodash"

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form implements OnInit, OnChanges {
  @Input() questions: Field[] = []
  @Input() item: any = {} //Es el valor de la información que se querría actualizar
  @Output() up: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  @Output() guardar: EventEmitter<any> = new EventEmitter<any>();
  constructor(private formbuilder: FormBuilder) {
    super(formbuilder);
  }


  ngOnInit() {
    if(isDevMode()) console.log("questions en form.components", this.questions)
    this.buildForm(this.patchValue(this.questions, this.item))
    // this.form.patchValue(this.item)
    // this.form.updateValueAndValidity()
    if(isDevMode()) console.log("formulario actual", this.form)
    this.form.statusChanges.subscribe(status => this.IsValid(status))
  }

  ngOnChanges() {
    if(isDevMode()) console.log("AQUÍ HUBO CAMBIOSS")
    
    this.buildForm(this.patchValue(this.questions, this.item))

    // this.form.patchValue(this.item)
    this.form.updateValueAndValidity()
    this.save()
  }
  patchValue(questions, item) {
    if(isDevMode()) console.log("El item está vacío", item, this.form)
    
    if(!_.isEmpty(item)) { //muta el objeto
      var localquestions = []
      questions.forEach(question => {
        var questionwithvalues = question
        if(isDevMode()) console.log("las preguntas son estas", question)
        questionwithvalues.value = item[question.key]
        localquestions.push(questionwithvalues)
      })
      return localquestions
    }
    else return this.questions
  }
  save() {
   this.up.emit(this.form)
  }
  guardarForm() {
    this.up.emit(this.form)
  }
  
  delete() {
    this.remove.emit("hola")
  }
  IsValid(status) {
    if(isDevMode()) console.log("El status cambió", status, this.form)
    status == "VALID" ? this.save(): ""
  }

}
