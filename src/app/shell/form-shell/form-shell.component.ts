import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Itemize } from '../../models/itemize';
import { Model } from '../../models/model';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-form-shell',
  templateUrl: './form-shell.component.html',
  styleUrls: ['./form-shell.component.css']
})
export class FormShellComponent implements OnInit {
  api: string
  model: Model
  idName: string
  constructor(private route: ActivatedRoute, private ds: DataService) { }

  ngOnInit() {
    this.route.data.subscribe((data:{model: any, values: any, api: string, idName: string }) => {
      var model = Object.assign({}, data.model)
      if(data.values) {
        for(let val in model) {
          model[val]["value"] = data.values[val]
        }
      }
      this.ds.setURL(data.api)
      this.model = model
      this.idName = data.idName
      
    })
  }
  save(data) {
    console.log(data)
    if(data[this.idName]) {
      var id = data[this.idName]
      this.ds.updateData(id, data).subscribe(data => console.log(data))
    }
    else {
      this.ds.addData(data).subscribe(data => console.log(data))
    }
  }

}
