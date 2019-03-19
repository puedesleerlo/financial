import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
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
    console.log("questions en form.components", this.questions)
    this.patchValue()
    this.buildForm(this.questions)
    // this.form.patchValue(this.item)
    // this.form.updateValueAndValidity()
    console.log("formulario actual", this.form)
    this.form.statusChanges.subscribe(status => this.IsValid(status))
  }

  ngOnChanges() {
    console.log("AQUÍ HUBO CAMBIOSS")
    this.patchValue()
    this.buildForm(this.questions)

    // this.form.patchValue(this.item)
    // this.form.updateValueAndValidity()
    this.save()
  }
  patchValue() {
    console.log("El item está vacío", this.item)
    if(!_.isEmpty(this.item)) {
      this.questions.forEach(question => {
        console.log("las preguntas son estas", question)
        question.value = this.item[question.key]
      })
    }
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
    console.log("El status cambió", status, this.form)
    status == "VALID" ? this.save(): ""
  }

}
