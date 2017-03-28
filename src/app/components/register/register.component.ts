import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../../services/register.service";
import { Router } from "@angular/router";
import { User } from "../../models/User";
import {AuthenticateService} from "../../services/authenticate.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  isShow = false;
  message: string;
  class = {'alert-success': false, 'alert-danger': false};
  confirmPassword: string;

  constructor(private registerService: RegisterService, private router: Router, private authenticateService: AuthenticateService) { }

  ngOnInit() {
  }

  registerStudent(event){
    event.preventDefault();
    this.user.userRole = 'student';
    this.registerService.register(this.user).subscribe(data => {
      console.log(data.message);
      if (data.success){
        this.class['alert-success'] =true;
        this.class['alert-danger'] =false;
        this.isShow = true;
        this.message = data.message;
        this.authenticateService.setToken(data.token);
        this.router.navigate(['/dashboard']);
      }
      else{
        this.class['alert-danger'] =true;
        this.class['alert-success'] =false;
        this.isShow = true;
        this.message = data.message;
        this.user.password = "";
        this.confirmPassword ="";
      }
    }, error => {
      alert(error);
    });
  }

}
