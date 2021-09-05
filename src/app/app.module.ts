import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { TripsComponent } from './components/trips/trips.component';

import {ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserService } from './services/user.service';
import { TripsService } from './services/trips.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TripsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    UserService,
    TripsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
