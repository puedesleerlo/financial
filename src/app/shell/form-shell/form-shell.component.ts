import { Component, OnInit, ChangeDetectorRef, isDevMode } from '@angular/core';
import { ActivatedRoute, Route, UrlSegment } from '@angular/router';
import { DataService } from '../../data.service';
import { environment } from 'src/environments/environment';
import { FormSample } from 'src/assets/admin.data';
import { FormModel, FormGroup } from 'src/app/models/form.model';
import { Model, Field } from 'src/app/models/model';
import * as _ from "lodash"
@Component({
  selector: 'app-form-shell',
  templateUrl: './form-shell.component.html',
  styleUrls: ['./form-shell.component.css']
})
export class FormShellComponent implements OnInit {
  api: string
  name: string
  item: any = {}
  idName: string
  forms: any[] = []
  outputValue = {}
  constructor(private route: ActivatedRoute, private ds: DataService, private cdRef:ChangeDetectorRef) { }
  //Este módulo es el que se conecta con la base de datos y recibe el formulario
  ngOnInit() {
    this.route.data.subscribe((data:{group?: any, item?: string, api: string}) => {

      if(isDevMode()) console.log("Formulario obtenido en form shell", data.group)

      this.route.parent.data.subscribe(data => {
        this.name = data.group.label
        this.forms = data.group.forms
      })

      if(isDevMode()) console.log("el item cambia", data.item)
      if(data.item) {
        this.item = data.item
      }
      else this.item = {}

      
      
      // if(data.api) {
      //   
      //   var company = this.route.snapshot.parent.paramMap.get("company")
      //   console.log("compañía en form-shell", company)
      //   this.ds.setURL(data.api + company + "/" + id)
      // }
      // this.route.url.subscribe((value: UrlSegment[]) => {
      //   if(value[0] && data.api) {
      //     this.ds.setURL(data.api+ company +"/"+ id + "/" + value[0].path)
      //   }
      // });
      
      
      

    })
  }
  isItemEmpty() {
    return _.isEmpty(this.item)
  }
  save() {
   
    var values = {}
    
    //absoluteform
    //obtener todas las preguntas
    // var questions = this.forms.map(form => form.questions) //Se obtiene un array de arrays con todas las preguntas
    var formname = this.route.snapshot.parent.paramMap.get("formname")
    var absoluteform = this.prepareData(this.outputValue, this.forms)
    this.ds.addData(formname, absoluteform).subscribe(resp => {
      if(resp["status"] == true) this.refresh()
    })
  }
  refresh(): void {
    setTimeout(() => {
      window.location.reload();
    }, 500)
    
  }
  getForm(data, id) {
    console.log("ese es el valor obtenido del formulario", this.outputValue)
    this.outputValue[id] = data
  }
  delete() {
    this.ds.deleteData().subscribe(data => console.log(data));
    
  }
  isCompleted(name): boolean{
    if(this.outputValue[name]) {
      return this.outputValue[name].valid 
    }
    return false
  }
  ngAfterViewChecked()
  {
  // console.log( "! changement de la date du composant !" );
  this.cdRef.detectChanges();
  }
  prepareData(outputValue, forms){

    var absoluteform = {}
    var self = this
    Object.keys(outputValue).map(function(name, index) {
      Object.assign(absoluteform, outputValue[name].value)
    });

    const questions = _.flatMap(forms, (form) => form.questions)

    console.log("obtengo tooodas las pregunas", questions)
    Object.keys(absoluteform).map(function(name){
      var question = questions.find((question) => question.name == name)
      if (question.datatype == "number") {
        absoluteform[name] = parseFloat(absoluteform[name])
      }
    })
    return absoluteform
  }

  

}