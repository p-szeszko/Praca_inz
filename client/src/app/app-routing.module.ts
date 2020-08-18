import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MySiteComponent } from './my-site/my-site.component';
import { MyWorkComponent } from './my-work/my-work.component';
import {HomeComponent} from './home/home.component';
import { EventMapComponent } from './my-work/event-map/event-map.component';
import { EventListComponent } from './my-work/event-list/event-list.component';
import { LocationsListComponent } from './my-work/locations-list/locations-list.component';
import { EquipmentComponent } from './my-work/equipment/equipment.component';
import { LoginComponent } from './my-work/login/login.component';
const routes: Routes = [{path: 'mySite', component: MySiteComponent},
{path: 'myWork', component: MyWorkComponent, children: [
  {path: 'map', component: EventMapComponent},
  {path: 'events', component: EventListComponent},
  {path: 'locations', component: LocationsListComponent},
  {path: 'eq', component: EquipmentComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: EventMapComponent}
  ]},
 {path: '', component: HomeComponent},

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
