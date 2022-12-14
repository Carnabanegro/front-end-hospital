import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { UsersComponent } from './users/users.component';
import { Error404Component } from './error404/error404.component';
import { Error505Component } from './error505/error505.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import {ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HospitalsComponent,
    DoctorsComponent,
    UsersComponent,
    Error404Component,
    Error505Component,
    ProfileComponent
  ],
  exports:[
    HospitalsComponent,
    DoctorsComponent,
    UsersComponent,
    Error404Component,
    Error505Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
