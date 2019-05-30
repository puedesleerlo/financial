import { Component, OnInit, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'table-shell',
  templateUrl: './table-shell.component.html',
  styleUrls: ['./table-shell.component.css']
})
export class TableShellComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() items: any[]
  @Input() structure
  dataSource = new MatTableDataSource(this.items);
  selection = new SelectionModel<any>(false, []);
  constructor() { }

  ngOnInit() {
  }
  // get selectKeys() {
  //   //Parsea las claves ya que vienen en forma de objeto
  //   return ["select"].concat(this.structure.displaycolumns.map(key => key.key))
  // }
  getColumns() {
      return this.structure ? ["select"].concat(this.structure.displaycolumns) : ["select"]

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.keys.push("select")
  }
  ngOnChanges() {
    // console.log(this.items)
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.selection = new SelectionModel<any>(true, []);
  }

}
