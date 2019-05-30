import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {
  items;
  structure;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data)
      if(data.structure) {
        
        this.items = data.structure.items;
        this.structure = data.structure;
      }
      
    })
  }

}
