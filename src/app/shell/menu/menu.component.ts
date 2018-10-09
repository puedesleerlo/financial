import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() selected = new EventEmitter<string[]>()
  selection = new SelectionModel<string>(false, []);
  features = [
    {
      path: "members",
      label: "Members"
    }
  ]
  constructor() { }

  ngOnInit() {
  }
  clicked() {
      this.selected.emit(this.selection.selected)
  }

}
