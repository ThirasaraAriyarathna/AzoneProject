import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticateService {

  constructor(private http: Http) { }

  authenticate(user: User){
    var header = new Headers();

    header.append('Content-Type','application/json');
    return this.http.post('/api/authenticate', user, {headers: header}).map(res => res.json());
  }

  getUser(){
    var token =this.getToken();
    if(token){
      var header = new Headers();
      header.append('x-access-token',token);
      return this.http.post('/api/getUserDetails', {headers: header}).map(res => res.json());
    }
  }

  setToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  loggedIn(){
    if (this.getToken()){
      return true;
    }
    else{
      return false;
    }
  }

  logout(){
    event.preventDefault();
    localStorage.removeItem('token');
  }

}
