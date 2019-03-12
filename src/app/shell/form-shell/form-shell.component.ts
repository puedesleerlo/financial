import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { environment } from 'src/environments/environment';

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
    this.route.data.subscribe((data:{info: Info}) => {
      // if(data.values) {
      //   for(let val in model) {
      //     model[val]["value"] = data.values[val]
      //   }
      // }
      // console.log(data.info)
      this.ds.setURL(environment + data.info.endpoint)
      this.model = data.info.model
      this.idName = data.info.idname
      
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

interface Info {
  name: string
  endpoint: string,
  idname: string,
  model: Model
}
interface Model {
  [key: string]: Field
}
interface Field {
  value: string,
  controlType: string, 
  type: string,
  key: string,
  label: string
}