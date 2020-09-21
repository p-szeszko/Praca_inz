import { Component, OnInit} from '@angular/core';
import { LoginService } from './services/login.service';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.scss']
})
export class MyWorkComponent implements OnInit {
  token:String=null;
  user={userID:'Login', name:'',photo:''};
  dat={};


  constructor(private loginS: LoginService, private cookieService: CookieService ) {
     this.token = cookieService.get("ASGjwt");
     console.log(cookieService);
    if(this.token)
    {
      loginS.Login(this.token).subscribe(data=>{
        this.user=data.body;
        console.log(data);
      },e =>{cookieService.delete('ASGjwt');})
    }
    else{
      console.log("No token");
    }
this.user=null;
  }

  ngOnInit(): void {
  }
  loginF()
  { // fireup service to Login via Google.
      /*this.loginS.Login().subscribe((data: any[])=>{
        console.log(data);
      });*/
     // console.log('aaa');
      //this.cookieService.set('aa','123');
      window.location.replace("http://localhost:3000/auth/google");

    //alert(json);
  }

}
