import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, UrlSegment } from '@angular/router';
import { DataService } from '../../data.service';
import { environment } from 'src/environments/environment';
import { FormSample } from 'src/assets/admin.data';
import { FormModel, FormGroup } from 'src/app/models/form.model';
import { Model, Field } from 'src/app/models/model';

@Component({
  selector: 'app-form-shell',
  templateUrl: './form-shell.component.html',
  styleUrls: ['./form-shell.component.css']
})
export class FormShellComponent implements OnInit {
  api: string
  questions: Field[] = []
  name: string
  idName: string
  forms: FormGroup
  outputValue = {}
  constructor(private route: ActivatedRoute, private ds: DataService) { }
  //Este módulo es el que se conecta con la base de datos y recibe el formulario
  ngOnInit() {
    this.route.data.subscribe((data:{form?: any, api?: string}) => {

      console.log("Formulario obtenido", data)

      this.name = data.form.name
      this.forms = data.form.forms
      
      if(data.api) {
        console.log("ROUTA", )
        var id = this.route.snapshot.parent.paramMap.get("id")
        this.ds.setURL(data.api + id)
      }
      this.route.url.subscribe((value: UrlSegment[]) => {
        if(value[0] && data.api) {
          this.ds.setURL(data.api+ id + "/"  + value[0].path)
        }
      });
      
      
      

    })
  }
  save() {
   
    var values = {}
    var absoluteform = {}
    var self = this
    Object.keys(this.outputValue).map(function(key, index) {
      values[key] = self.outputValue[key].value;
      Object.assign(absoluteform, self.outputValue[key].value)
    });
    Object.keys(absoluteform).map(function(key){
      // absoluteform
      try {
        absoluteform[key]= parseInt(absoluteform[key])
      }
      catch {
        console.error("No se pudo cambiar a entero")
      }
    })
    console.log("values", absoluteform)
    this.ds.addData(absoluteform).subscribe(resp => {
      console.log(resp)
    })
    // if(data[this.idName]) {
    //   var id = data[this.idName]
    //   this.ds.updateData(id, data).subscribe(data => console.log(data))
    // }
    // else {
    //   this.ds.addData(data).subscribe(data => console.log(data))
    // }
  }
  getForm(data, id) {
    console.log("ese es el valor obtenido del formulario", this.outputValue)
    this.outputValue[id] = data
  }
  delete() {
    this.ds.deleteData().subscribe(data => console.log(data));
    
  }

}