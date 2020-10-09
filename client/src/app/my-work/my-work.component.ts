import { Component, OnInit} from '@angular/core';
import { LoginService } from './services/login.service';
import {EventServiceService} from './services/event-service.service'
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.scss']
})
export class MyWorkComponent implements OnInit {
  token:String=null;
  user={userID:'Login', name:'',photo:''};
  data={};


  constructor(private loginS: LoginService, private cookieService: CookieService, public eventS: EventServiceService ) {

     this.token = cookieService.get( "ASGjwt" );
     if(this.token)
    {
      loginS.Login(this.token).subscribe(data=>{
        this.user = data.body;
      },e =>{cookieService.delete('ASGjwt');})
    }
    else{
      console.log("No token");
    }
    this.user=null;

  }

  ngOnInit():void {

  }
  loginF()
  {
    window.location.replace("http://localhost:3000/auth/google");
  }

}
