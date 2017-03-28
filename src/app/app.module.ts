import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {routing} from "./app.routing";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {RegisterService} from "./services/register.service";
import { MessageComponent } from './components/message/message.component';
import {AuthenticateService} from "./services/authenticate.service";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeNavComponent } from './components/home-nav/home-nav.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { AddAssistantComponent } from './components/add-assistant/add-assistant.component';
import { AddClassComponent } from './components/add-class/add-class.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MessageComponent,
    DashboardComponent,
    HomeNavComponent,
    AddStudentComponent,
    AddTeacherComponent,
    AddAssistantComponent,
    AddClassComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [RegisterService, AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
