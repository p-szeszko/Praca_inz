import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
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
import { EventFormComponent } from './my-work/event-form/event-form.component';
import {EventServiceService} from './my-work/services/event-service.service';
import { CommonModule } from '@angular/common';
import { EventInfoComponent } from './my-work/event-info/event-info.component';
import {MatCardModule} from '@angular/material/card';


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
    EventFormComponent,
    EventInfoComponent,

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
    MatTabsModule,
    HttpClientModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatPaginatorModule,
    MatCardModule
  ],
  exports:[ReactiveFormsModule, FormsModule, CommonModule],
  providers: [LoginService, CookieService, EventServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
