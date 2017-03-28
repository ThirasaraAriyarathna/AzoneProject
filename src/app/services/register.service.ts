import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  register(user: User){
    var header = new Headers();

    header.append('Content-Type','application/json');
    return this.http.post('/api/register', user, {headers: header}).map(res => res.json());
  }

}
