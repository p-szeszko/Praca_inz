import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MySiteComponent } from './my-site/my-site.component';
import { MyWorkComponent } from './my-work/my-work.component';
import {HomeComponent} from "./home/home.component";
const routes: Routes = [{path: "mySite", component:MySiteComponent},
{path:"myWork",component:MyWorkComponent},
 {path:"", component:HomeComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
