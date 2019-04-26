import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {View, Parse, parse, Spec} from 'vega';
declare var vega: any;
@Component({
  selector: 'app-dynvega',
  templateUrl: './dynvega.component.html',
  styleUrls: ['./dynvega.component.css']
})
export class DynvegaComponent implements OnInit {
  view: View;
  @Input() id: any;
  @Output() outgoingData = new EventEmitter<any>();
  @Input() pathToData: string;
  constructor() { }

  public vegaInit(spec: Spec) {
    this.view = new vega.View(vega.parse(spec))
      .renderer('svg')          // set renderer (canvas or svg)
      .initialize('#' + this.id)// initialize view within parent DOM container
      .width(600)               // set chart width 
      .height(500)              // set chart height
      .hover()                  // enable hover encode set processing
      .run();
  }
  ngOnInit() {
    vega.loader().load(this.pathToData)
    .then((data) => { this.vegaInit(JSON.parse(data)); });
  }

}
