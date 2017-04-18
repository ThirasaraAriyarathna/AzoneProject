import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthenticateService} from "../services/authenticate.service";
import {timeout} from "rxjs/operator/timeout";
import {AppComponent} from "../app.component";

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private authenticateService: AuthenticateService) { }

  canActivate() {
    if (this.authenticateService.loggedIn()){

      if(localStorage.getItem('role') == "admin"){
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
