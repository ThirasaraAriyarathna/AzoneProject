import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AddTeacherComponent} from "./components/add-teacher/add-teacher.component";
import {AddAssistantComponent} from "./components/add-assistant/add-assistant.component";
import {AddStudentComponent} from "./components/add-student/add-student.component";
import {AddClassComponent} from "./components/add-class/add-class.component";
import {AuthGuard} from "./Guards/auth.guard";
import {AdminAuthGuard} from "./Guards/adminAuth.guard";
import {StaffAuthGuard} from "./Guards/staffAuth.guard";
import {AssistantAuthGuard} from "./Guards/assistantAuth.guard";
import {MarkAttendanceComponent} from "./components/mark-attendance/mark-attendance.component";
import {SearchClassComponent} from "./components/search-class/search-class.component";
import {ClassViewComponent} from "./components/class-view/class-view.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'addTeachers', component: AddTeacherComponent, canActivate: [AdminAuthGuard] },
  { path: 'addAssistants', component: AddAssistantComponent, canActivate: [AdminAuthGuard] },
  { path: 'addStudents', component: AddStudentComponent, canActivate: [AssistantAuthGuard] },
  { path: 'addClasses', component: AddClassComponent, canActivate: [AssistantAuthGuard] },
  { path: 'markAttendance', component: MarkAttendanceComponent, canActivate: [AssistantAuthGuard] },
  { path: 'searchClass', component: SearchClassComponent, canActivate: [AuthGuard] },
  { path: 'viewClass/:id', component: ClassViewComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '/home' }
];

export  const routing = RouterModule.forRoot(APP_ROUTES);
