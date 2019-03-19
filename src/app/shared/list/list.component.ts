import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() listType: string = "table"
  @Input() items: any[]
  @Input() questions: any
  @Input() keys: any[] = []
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() selected = new EventEmitter<Object[]>();
  dataSource = new MatTableDataSource(this.items);
  selection = new SelectionModel<any>(false, []);
  
  constructor() { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.keys.push("select")
  }
  get selectKeys() {
    //Parsea las claves ya que vienen en forma de objeto
    return ["select"].concat(this.keys.map(key => key.key))
  }

  ngOnInit() { }

  ngOnChanges() {
    // console.log(this.items)
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  clicked() {
    if(this.selection.hasValue()) {
      this.selected.emit(this.selection.selected)
    }
    
  }

}
