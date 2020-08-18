import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.scss']
})
export class MyWorkComponent implements OnInit {

  user: object = {
    username: 'ggg',
    password: 'fff'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
