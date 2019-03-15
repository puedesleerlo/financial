import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Field as Question } from 'src/app/models/model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialog implements OnInit {
  questions: any
  form: FormGroup
  constructor(
    public dialogRef: MatDialogRef<QuestionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {questions: Question[]}) {}

  ngOnInit() {
    // this.data.questions.map(val => this.arrayMapping(val));
    this.questions =  this.data.questions//Es un array
    console.log(this.questions)
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
