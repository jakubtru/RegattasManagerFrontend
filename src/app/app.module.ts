import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./api.service";
import { RegattaComponent } from './regatta/regatta.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { RegattaInfoComponent } from './regatta-info/regatta-info.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegattaManagementComponent } from './regatta-management/regatta-management.component';
import { RegattaStatisticsComponent } from './regatta-statistics/regatta-statistics.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AppComponent,
    RegattaComponent,
    NavbarComponent,
    FooterComponent,
    RegattaInfoComponent,
    HomePageComponent,
    RegattaManagementComponent,
    RegattaStatisticsComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    MatInputModule,
    MatDialogModule,
    /*NgbModalModule*/
  ],
  providers: [ApiService],
  bootstrap: [AppComponent, RegattaComponent, NavbarComponent, FooterComponent]
})
export class AppModule { }
