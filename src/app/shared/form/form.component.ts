import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Form } from './form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormModel } from 'src/app/models/form.model';
import { Model, Field } from 'src/app/models/model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form implements OnInit, OnChanges {
  @Input() questions: Field[] = []
  @Output() up: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  @Output() guardar: EventEmitter<any> = new EventEmitter<any>();
  constructor(private formbuilder: FormBuilder) {
    super(formbuilder);
  }


  ngOnInit() {
    console.log("questions en form.components", this.questions)
    this.buildForm(this.questions)
    console.log("formulario actual", this.form)
    this.form.statusChanges.subscribe(status => this.IsValid(status))
  }

  ngOnChanges() {
    this.buildForm(this.questions)
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
    status == "VALID" ? this.save(): ""
  }

}
