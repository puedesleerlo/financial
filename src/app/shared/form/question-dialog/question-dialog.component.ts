import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialog implements OnInit {
  schema: any
  constructor(
    public dialogRef: MatDialogRef<QuestionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.schema = this.data.schema;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  pushArray(event) {
    this.dialogRef.close(event)
  }

}
