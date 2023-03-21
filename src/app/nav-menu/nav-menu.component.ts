import {Component, OnInit, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {GraphqlService} from "../_services";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  constructor(private router: Router, private zone: NgZone, private graphqlService: GraphqlService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.graphqlService.logout();
    this.zone.run(() => {
      this.router.navigate(['login']);
    });
  }


  isLoggedIn() {
    return this.graphqlService.isLoggedIn();
  }
}
