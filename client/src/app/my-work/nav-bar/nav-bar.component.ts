import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router"
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
   map = 'Mapa';
   events = 'Wydarzenia';
   locations = 'Miejscówki';
   login = 'Zaloguj się';
   eq = 'Ekwipunek';
  constructor(public route: Router) { }
 user = {username: 'ddd', password: 'ss'};
  ngOnInit(): void {
    //alert(this.user.username);
  }
location()
{
  this.route.navigate(['myWork/locations'], { queryParams:{user:JSON.stringify(this.user), map:this.map}, queryParamsHandling: 'merge'});
}
}
