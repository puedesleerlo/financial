import { Component } from '@angular/core';
import { HTTPStatus } from './auth/auth.interceptor';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'financial';
  pending:boolean
  loading = false
  constructor(private httpStatus: HTTPStatus, private router: Router) {
    this.httpStatus.getHttpStatus().subscribe(isPending => {
      this.pending = isPending
      console.log("pendiente", isPending)
    })
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  goTo(ev) {
    console.log(ev)
  }
}
