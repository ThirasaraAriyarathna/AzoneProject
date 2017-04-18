import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {Student} from "../models/Student";
import {Assistant} from "../models/Assistant";
import {Teacher} from "../models/Teacher";

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  register(user: User){
    var header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('/api/register', user, {headers: header}).map(res => res.json());
  }

  registerStudent(student: Student){
    var header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('/api/registerStudent', student, {headers: header}).map(res => res.json());
  }

  registerAssistant(assistant: Assistant){
    var header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('/api/registerAssistant', assistant, {headers: header}).map(res => res.json());
  }

  registerTeacher(teacher: Teacher){
    var header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('/api/registerTeacher', teacher, {headers: header}).map(res => res.json());
  }

}
