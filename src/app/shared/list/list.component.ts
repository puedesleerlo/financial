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
  @Input() keys: string[] = []
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
    return ["select"].concat(this.keys)
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
