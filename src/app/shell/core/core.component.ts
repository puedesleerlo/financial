import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Model} from '../../models/model';
import { Itemize } from '../../models/itemize';
import { ExcelService } from 'src/app/utils/excel.service';
import * as _ from "lodash"
import { environment } from 'src/environments/environment.prod';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
  items: any[]
  item: Model = {}
  questions: any[]
  idName: string = "ID"
  listType = "table"
  keys = []
  lists = []
  endpoint: string;
  url: string;
  constructor(private route: ActivatedRoute, private router: Router, private exs: ExcelService) { 
  }

  ngOnInit() {
    this.route.data.subscribe((data:{items: any, group:any, api:any}) => {
      
      this.items = data.items
      let stage = this.route.snapshot.paramMap.get("id")
      this.url = data.api + stage;
      if(isDevMode()) console.log("url en core", this.url)
      var leaderform = _.flatten(data.group.forms.filter(form => form.key == data.group.leaderform).map(form => form.questions))
      if(isDevMode()) console.log("leaderform", leaderform)
      this.idName = data.group.idname
      var displayColumns: any[] = leaderform
      var aditionalColumns = [
        // {key: "ID", label: "ID", type: "number"},
        {key: "CreatedAt", label: "Creado en", type: "date"},
        {key: "UpdatedAt", label: "Actualizado en", type: "date"}
      ]
      // this.route.children[0].data.subscribe(data => console.log(data))
      // this.listType = data.listType
      this.keys = displayColumns.concat(aditionalColumns)
      if(isDevMode())  console.log("keys de columnas", displayColumns);
      
      // this.model = FormSample[stage]
      // console.log(this.model)
      // this.idName = this.model.idname
    })
  }
  
  selection(ev: Itemize[]) {
    this.router.navigate(['./' +  ev[0][this.idName]], {relativeTo: this.route});
  }

  gotoGrafana() {
    document.location.href = environment.base + "grafana";
  }

  exportToExcel() {
    this.exs.exportAsExcelFile(this.items, this.url)
  }

  navigateToHere() {
    this.router.navigate([this.url])
    this.refresh()

  }
  refresh(): void {
    setTimeout(() => {
      window.location.reload();
    }, 500)
    
  }
}
