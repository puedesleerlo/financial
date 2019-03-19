import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Model} from '../../models/model';
import { Itemize } from '../../models/itemize';
import { FormSample } from 'src/assets/admin.data';

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
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data:{items: any, group:any}) => {
      console.log(data)
      this.items = data.items
      let stage = this.route.snapshot.paramMap.get("id")
      var leaderform = data.group.forms.filter(form => form.key ==data.group.leaderform);
      console.log("leaderform", leaderform)
      this.idName = data.group.idname
      var displayColumns: any[] = leaderform[0].questions
      var aditionalColumns = [
        {key: "ID", label: "ID", type: "number"},
        {key: "CreatedAt", label: "Creado en", type: "date"},
        {key: "UpdatedAt", label: "Actualizado en", type: "date"}
      ]
      // this.route.children[0].data.subscribe(data => console.log(data))
      // this.listType = data.listType
      this.keys = aditionalColumns.concat(displayColumns)
      console.log("keys de columnas", displayColumns);
      
      // this.model = FormSample[stage]
      // console.log(this.model)
      // this.idName = this.model.idname
    })
  }
  
  selection(ev: Itemize[]) {
    this.router.navigate(['./' +  ev[0][this.idName]], {relativeTo: this.route});
  }

}
