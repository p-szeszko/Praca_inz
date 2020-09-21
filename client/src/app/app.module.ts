import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {  MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from "@angular/material/dialog";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './my-site/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MySiteComponent } from './my-site/my-site.component';
import { MyWorkComponent } from './my-work/my-work.component';
import { HomeComponent, SiteDialogComponent } from './home/home.component';
import { EventMapComponent } from './my-work/event-map/event-map.component';
import { NavBarComponent } from './my-work/nav-bar/nav-bar.component';
import { EventListComponent } from './my-work/event-list/event-list.component';
import { EquipmentComponent } from './my-work/equipment/equipment.component';
import { LocationsListComponent } from './my-work/locations-list/locations-list.component';
import { LoginComponent } from './my-work/login/login.component';
import { LoginService } from './my-work/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MySiteComponent,
    MyWorkComponent,
    SiteDialogComponent,
    HomeComponent,
    EventMapComponent,
    NavBarComponent,
    EventListComponent,
    EquipmentComponent,
    LocationsListComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    GoogleMapsModule
  ],

  providers: [LoginService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
