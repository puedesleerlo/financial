import { Component, OnInit } from '@angular/core';
import { FormGroup } from 'src/app/models/form.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormSample } from 'src/assets/admin.data';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  api: string
  name: string
  idName: string
  forms: FormGroup
  outputValue = {}
  constructor(private route: ActivatedRoute, private ds: DataService) { }
  //Este módulo es el que se conecta con la base de datos y recibe el formulario
  ngOnInit() {
    this.route.data.subscribe((data:{form?: any}) => {
      // if(data.values) {
      //   for(let val in model) {
      //     model[val]["value"] = data.values[val]
      //   }
      // }
      // console.log(data)
      // if(data.form) {
      //   console.log(data.form.form)
      // }
      let form = data.form.form
      let stage = this.route.snapshot.parent.paramMap.get("id")
      let sample = FormSample[stage] //Retorna un grupo
      sample.forms.forEach(form => {
        form.questions.forEach(val => {
          val.value = form[val.key]
        });
      })
      this.forms = sample.forms;
      
      // console.log(sample)
      this.name = form.name
      
      
      // this.ds.setURL(environment + data.info.endpoint)
      // this.model = data.info.model
      // this.idName = data.info.idname
      
    })
  }
  save() {
    console.log(this.outputValue)
    // if(data[this.idName]) {
    //   var id = data[this.idName]
    //   this.ds.updateData(id, data).subscribe(data => console.log(data))
    // }
    // else {
    //   this.ds.addData(data).subscribe(data => console.log(data))
    // }
  }
  getForm(data, id) {
    
    this.outputValue[id] = data
  }
}
