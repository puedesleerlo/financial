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
  model: any
  idName: string = "ID"
  listType = "table"
  keys = []
  lists = []
  endpoint: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data:{items: any}) => {
      console.log(data)
      this.items = data.items
      let stage = this.route.snapshot.paramMap.get("id")
      // this.listType = data.listType
      this.keys = ["company", "displayinfo", "endpoint", "idname", "name","ID"]
      this.model = FormSample[stage]
      this.idName = this.model.idname
      // console.log(this.model)
      // this.idName = this.model.idname
    })
  }
  
  selection(ev: Itemize[]) {
    this.router.navigate(['./' +  ev[0][this.idName]], {relativeTo: this.route});
  }

}
