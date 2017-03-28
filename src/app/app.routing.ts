import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AddTeacherComponent} from "./components/add-teacher/add-teacher.component";
import {AddAssistantComponent} from "./components/add-assistant/add-assistant.component";
import {AddStudentComponent} from "./components/add-student/add-student.component";
import {AddClassComponent} from "./components/add-class/add-class.component";

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/addTeachers', component: AddTeacherComponent },
  { path: 'admin/addAssistants', component: AddAssistantComponent },
  { path: 'staff/addStudents', component: AddStudentComponent },
  { path: 'staff/addClass', component: AddClassComponent }
];

export  const routing = RouterModule.forRoot(APP_ROUTES);
