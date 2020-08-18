import { Component, OnInit, Input } from '@angular/core';
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
  constructor() { }
 user = {username: 'ddd', password: ''};
  ngOnInit(): void {
    alert(this.user.username);
  }

}
