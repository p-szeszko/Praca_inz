import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {Router} from "@angular/router"
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
   @Input('user') user;
   @Output('loginF') loginF: EventEmitter<any> = new EventEmitter<any>();
   map = 'Mapa';
   events = 'Wydarzenia';
   locations = 'Miejscówki';
   login = 'Zaloguj się';
   eq = 'Ekwipunek';
  constructor(public route: Router) { }
  ngOnInit(): void {
  }
location()
{
  this.route.navigate(['myWork/locations'], { queryParams: { user: JSON.stringify(this.user), map: this.map}, queryParamsHandling: 'merge'});
}

loginFunc()
{
this.loginF.emit();
}
}
