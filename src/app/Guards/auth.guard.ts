import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthenticateService} from "../services/authenticate.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticateService: AuthenticateService) { }

  canActivate() {
    if (this.authenticateService.loggedIn()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
