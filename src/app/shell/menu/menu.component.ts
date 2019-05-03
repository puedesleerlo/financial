import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormModel } from 'src/app/models/form.model';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation.service';

export interface navigation {
  name: string;
  forms: FormModel[]
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() selected = new EventEmitter<string[]>()
  user: any = {};
  selection = new SelectionModel<string>(false, []);
  links = [
    {
      path: "members",
      label: "Members"
    }
  ]
  constructor(private nvs: NavigationService, private router: Router) { }

  ngOnInit() {
    this.nvs.getFormsByCompany().subscribe((data:any) => {
      this.links = data.items
      this.user = data.user
      console.log("el grupo del usuario y las compañías son", data)
    })
  }
  clicked() {
      this.selected.emit(this.selection.selected)
  }
  Getlink(link, formname) {
    return '/forms/'+link.name+'/'+formname 
  }
  isAdmin() {
    return this.user.role === "admin"
  }
  goTo(link, formname) {
    var path = this.Getlink(link, formname)
    this.nvs.updateCompany(link.name)
    this.router.navigate([path])
  }

}
