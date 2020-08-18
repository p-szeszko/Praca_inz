import { Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit {

  user = {username: '', password: ''};
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user.username = JSON.parse(params.username) as string;
    });
    alert(this.user.username);
  }


}
