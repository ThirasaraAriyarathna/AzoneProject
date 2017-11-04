import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DatePickerModule } from 'ng2-datepicker';
import { MomentModule } from 'angular2-moment';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { routing } from "./app.routing";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterService } from "./services/register.service";
import { MessageComponent } from './components/message/message.component';
import { AuthenticateService } from "./services/authenticate.service";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeNavComponent } from './components/home-nav/home-nav.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { AddAssistantComponent } from './components/add-assistant/add-assistant.component';
import { AddClassComponent } from './components/add-class/add-class.component';
import { AuthGuard } from './Guards/auth.guard';
import { AdminAuthGuard } from './Guards/adminAuth.guard';
import { AssistantAuthGuard } from './Guards/assistantAuth.guard';
import { TeacherAuthGuard } from './Guards/teacherAuth.guard';
import { StaffAuthGuard } from './Guards/staffAuth.guard';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ClassService } from "./services/class.service";
import { MarkAttendanceComponent } from './components/mark-attendance/mark-attendance.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { MarkAttendanceService } from "./services/mark-attendance.service";
import { SearchClassComponent } from './components/search-class/search-class.component';
import { SearchByCatogoryComponent } from './components/search-by-catogory/search-by-catogory.component';
import { ClassViewComponent } from './components/class-view/class-view.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


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
    AddClassComponent,
    DropdownComponent,
    MarkAttendanceComponent,
    SearchBoxComponent,
    SearchClassComponent,
    SearchByCatogoryComponent,
    ClassViewComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DatePickerModule,
    MomentModule,
    NguiDatetimePickerModule
  ],
  providers: [
    RegisterService,
    AuthenticateService,
    AuthGuard,
    AdminAuthGuard,
    AssistantAuthGuard,
    TeacherAuthGuard,
    StaffAuthGuard,
    ClassService,
    MarkAttendanceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
