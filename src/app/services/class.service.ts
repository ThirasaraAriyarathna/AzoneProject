import { Injectable } from '@angular/core';
import { Class } from "../models/Class";
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class ClassService {

  constructor(private http: Http) { }

  addClass(classe: Class){
    var header = new Headers();

    header.append('Content-Type','application/json');
    return this.http.post('/api/authenticate', classe, {headers: header}).map(res => res.json());
  }

  getTeachers(){

    return this.http.get('/api/class/getTeachers').map(res => res.json());
  }

  getBatches(){

  }

  getSubjects(){

  }
}
