import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {AuthenticateService} from "../../services/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user= new User();
  isLogged: boolean;
  constructor(private authenticateService: AuthenticateService, private router: Router) { }

  ngOnInit() {
    //checking for user details on init
    if(this.authenticateService.loggedIn()) {
      this.authenticateService.getUser().subscribe(data =>{
          this.user.username = data.username;
          this.user.email = data.email;
          this.user.userRole = data.role;
          this.isLogged = true;
          if(this.user.userRole == "student"){
            this.router.navigate(['/searchClass']);
          }
          else if(this.user.userRole == "teacher"){
            this.router.navigate(['/searchClass']);
          }
        },
        error => {
          alert(error);
        });

    }

    else{
      this.isLogged = false;
      //if not logged in redirect to login
      this.router.navigate(['/login']);
    }

    this.authenticateService.setUser();//set user details in the local browser
  }

}
