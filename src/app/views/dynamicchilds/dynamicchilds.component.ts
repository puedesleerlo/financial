import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamicchilds',
  templateUrl: './dynamicchilds.component.html',
  styleUrls: ['./dynamicchilds.component.css']
})
export class DynamicchildsComponent implements OnInit {

  title = 'app';
  mainChart: any;
  subChart: any;

  charts = [{name: 'world-map', path: '../../../assets/charts/world-map.json'},
            {name: 'airport-connections', path: '../../../assets/charts/airport-connections.json'},
            {name: 'egde-bundling', path: '../../../assets/charts/edge-bundling.json'},
            {name: 'circle-packing', path: '../../../assets/charts/circle-packing.json'},
            {name: 'timeline', path: '../../../assets/charts/timeline.json'}];
  constructor() {  }

  ngOnInit() {
  }
  public handleMainChart(chartData: any) {
    this.mainChart = chartData;
    console.log(this.mainChart);
  }

}
