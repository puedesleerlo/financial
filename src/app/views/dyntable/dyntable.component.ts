import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  column1?: number;
}
const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-dyntable',
  templateUrl: './dyntable.component.html',
  styleUrls: ['./dyntable.component.css']
})
export class DyntableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA)
  maker = idMaker()
  formgroup: FormGroup
  formarray: FormArray
  constructor(private formbuilder:FormBuilder, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.formgroup = this.formbuilder.group({
      items: this.formbuilder.array([])
    })
  }
  addColumn() {
    this.displayedColumns.push(this.maker.next().value)
    var formarray = this.formgroup.get("items") as FormArray
    formarray.push(this.formbuilder.control(""))
  }
  submitFunctions() {
    this.controls.forEach((control, index) => {
      console.log(control)
      var func = eval(control)
      var data = this.dataSource.data.map(func)
      this.dataSource = new MatTableDataSource(data)
      this.changeDetectorRefs.detectChanges();
      console.log("este es el nuevo datasource", this.dataSource)
    });
  }
  get controls():any[] {
    return this.formgroup.get("items").value
  }
}

function* idMaker(){
  var index = 0;
  while(true)
    yield "column"+index++;
}