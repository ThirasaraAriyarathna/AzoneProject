import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {AuthenticateService} from "../../services/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  isShow = false;
  message: string;
  class = {'alert-success': false, 'alert-danger': false};

  constructor(private authenticateService: AuthenticateService, private router: Router) { }

  ngOnInit() {
  }
  authenticate(event){
    event.preventDefault();
    this.authenticateService.authenticate(this.user).subscribe(data => {
      console.log(data);
      if (data.success){
        this.class['alert-success'] =true;
        this.class['alert-danger'] =false;
        this.isShow = true;
        this.message = data.message;
        this.authenticateService.setToken(data.token);
        this.authenticateService.setUser();
        this.router.navigate(['/dashboard']);
      }
      else{
        this.class['alert-danger'] =true;
        this.class['alert-success'] =false;
        this.isShow = true;
        this.message = data.message;
        this.user.password = "";
      }
    }, error => {
      alert(error);
    });
  }

}
