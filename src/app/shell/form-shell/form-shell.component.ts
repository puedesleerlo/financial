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
    this.route.data.subscribe((data:{form?: any, item?: string, api: string}) => {

      if(isDevMode()) console.log("Formulario obtenido en form shell", data.form)
      this.route.parent.data.subscribe(data => {
        this.name = data.group.label
        this.forms = data.group.forms
      })
      
      this.route.data.subscribe(data => {
        if(isDevMode()) console.log("el item cambia", data.item)
        if(data.item) {
          this.item = data.item
        }
        else this.item = {}
      })
      
      
      if(data.api) {
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
  isItemEmpty() {
    return _.isEmpty(this.item)
  }
  save() {
   
    var values = {}
    
    //absoluteform
    //obtener todas las preguntas
    // var questions = this.forms.map(form => form.questions) //Se obtiene un array de arrays con todas las preguntas
    
    var absoluteform = this.prepareData(this.outputValue, this.forms)
    this.ds.addData(absoluteform).subscribe(resp => {
      console.log(resp)
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
  isCompleted(key): boolean{
    if(this.outputValue[key]) {
      return this.outputValue[key].valid 
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
    Object.keys(outputValue).map(function(key, index) {
      Object.assign(absoluteform, outputValue[key].value)
    });

    const questions = _.flatMap(forms, (form) => form.questions)

    console.log("obtengo tooodas las pregunas", questions)
    Object.keys(absoluteform).map(function(key){
      var question = questions.find((question) => question.key == key)
      if (question.type == "number") {
        absoluteform[key] = parseFloat(absoluteform[key])
      }
    })
    return absoluteform
  }

  

}