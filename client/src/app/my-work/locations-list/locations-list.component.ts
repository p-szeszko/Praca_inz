import { Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit {
  map='';
  user = {username: '', password: ''};
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
this.route.queryParams.subscribe(params =>{
  console.log(params);
})
  }


}
