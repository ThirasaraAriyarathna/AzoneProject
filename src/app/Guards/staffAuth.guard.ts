import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthenticateService} from "../services/authenticate.service";

@Injectable()
export class StaffAuthGuard implements CanActivate {

  constructor(private router: Router, private authenticateService: AuthenticateService) { }

  canActivate() {
    if (this.authenticateService.loggedIn()){

      var role =localStorage.getItem('role');
      if(role == "admin" || role == "assistant" || role == "teacher"){
        return true;
      }
      else{
        // not logged in as admin redirect to login page
        this.router.navigate(['/home']);
        return false;
      }
    }

    // not logged in so redirect to login page
    this.router.navigate(['/home']);
    return false;

  }

}
