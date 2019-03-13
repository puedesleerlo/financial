import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Form } from './form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormModel } from 'src/app/models/form.model';
import { Model } from 'src/app/models/model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form implements OnInit, OnChanges {
  @Input() model: Model = <Model>{}
  @Output() up: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formbuilder: FormBuilder) {
    super(formbuilder);
  }

  ngOnInit() {
    this.buildForm(this.model)
    console.log(this.model)
  }

  ngOnChanges() {
    this.buildForm(this.model)
  }
  save() {
   this.up.emit(this.form.value)
  }
  delete() {
    this.remove.emit("hola")
  }

}
