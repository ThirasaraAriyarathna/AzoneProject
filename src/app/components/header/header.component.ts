import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from "../../services/authenticate.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
      },
      error => {
        alert(error);
      });

    }

    else{
      this.isLogged = false;
      this.router.navigate(['/login']);
    }

    this.authenticateService.setUser();

  }

  logout(){
    this.authenticateService.logout();
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}
