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
  constructor(private authenticateService: AuthenticateService, private router: Router) { }

  ngOnInit() {
    if(this.authenticateService.loggedIn()){
      this.authenticateService.getUser().subscribe(
        data => {
          this.user.username = data.username;
          this.user.email = data.email;
          this.user.userRole = data.role;
        },
        error => {alert(error);}
      );
    }
    else{
      this.router.navigate(['/login']);
    }

  }

  logout(){
    this.authenticateService.logout();
    this.router.navigate(['/login']);
  }
}
