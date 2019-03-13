import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { environment } from 'src/environments/environment';
import { FormSample } from 'src/assets/admin.data';
import { FormModel } from 'src/app/models/form.model';
import { Model } from 'src/app/models/model';

@Component({
  selector: 'app-form-shell',
  templateUrl: './form-shell.component.html',
  styleUrls: ['./form-shell.component.css']
})
export class FormShellComponent implements OnInit {
  api: string
  model: Model
  name: string
  idName: string
  constructor(private route: ActivatedRoute, private ds: DataService) { }

  ngOnInit() {
    this.route.data.subscribe((data:{form?: FormModel}) => {
      // if(data.values) {
      //   for(let val in model) {
      //     model[val]["value"] = data.values[val]
      //   }
      // }
      this.name = data.form.name
      this.model = data.form.model
      
      
      // this.ds.setURL(environment + data.info.endpoint)
      // this.model = data.info.model
      // this.idName = data.info.idname
      
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