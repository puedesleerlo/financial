import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-lookup-dialog',
  templateUrl: './lookup-dialog.component.html',
  styleUrls: ['./lookup-dialog.component.css']
})
export class LookupDialog implements OnInit {
  items: any[] = []
  listType = "table"
  keys = []
  selected = []
  constructor(
    public dialogRef: MatDialogRef<LookupDialog>,
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {lookup:string},
    private ds: DataService) {}

  ngOnInit() {
    this.ds.lookupData(this.data.lookup).subscribe(items => {      console.log(items)
      this.keys = [
        {key: "name", label: "Nombre", type: "string"},
        {key: "label", label: "Etiqueta", type: "string"}
      ]
      this.items=items
      
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  selection(ev) {
    this.selected = ev
  }
  close() {
    this.dialogRef.close(this.selected)
  }

}
