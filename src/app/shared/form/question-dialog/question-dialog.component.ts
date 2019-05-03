import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Field as Question } from 'src/app/models/model';
import { FormGroup } from '@angular/forms';
import * as _ from "lodash"
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialog implements OnInit {
  questions: any[] = []
  form: FormGroup
  item: any
  constructor(
    public dialogRef: MatDialogRef<QuestionDialog>,
    public ds:DataService,
    @Inject(MAT_DIALOG_DATA) public data: {questions: Question[], item: any}) {}

  ngOnInit() {
    // this.data.questions.map(val => this.arrayMapping(val));
    var company = "administracion"
    var subformid = "newquestion"
    this.ds.setURL(`forms/${company}/newform`)
    this.ds.searchData(subformid).subscribe((form:any) => {
      console.log(form.item.questions)
      this.questions = form.item.questions
    })
    // this.questions =  this.data.questions//Es un array
    if(!_.isEmpty(this.data.item)) this.item = this.data.item
    console.log("Este es el valor de las preguntas", this.item)
  }
  arrayMapping(item) {
    Object.assign(item, item.custom)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close(this.form)
  }
  pushArray(event) {
    this.form = event
  }
  get isinValid() {
    if(this.form) return this.form.invalid
    return true
  }

}
