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
    return this.http.post('/api/addClass', classe, {headers: header}).map(res => res.json());
  }

  getTeachers(){
    return this.http.get('/api/getTeachers').map(res => res.json());
  }

  getBatches(){
    return this.http.get('/api/getBatches').map(res => res.json());
  }

  getSubjects(){
    return this.http.get('/api/getSubjects').map(res => res.json());
  }

  getClasses(){
    return this.http.get('/api/getClasses').map(res => res.json());
  }

  getClassesByCategory(criteria){

    var header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('/api/getClassesByCategory', criteria, {headers: header}).map(res => res.json());
  }

  getClass(id){

    var header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('/api/getClass', id, {headers: header}).map(res => res.json());
  }

  activateClass(data){

    var header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('/api/activateClass', data, {headers: header}).map(res => res.json());
  }

  deactivateClass(id){

    var header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('/api/deactivateClass', id, {headers: header}).map(res => res.json());
  }

  deleteClass(id){

    var header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('/api/deleteClass', id, {headers: header}).map(res => res.json());
  }

  registerClass(data){

    var header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('/api/registerClass', data, {headers: header}).map(res => res.json());
  }

  setUpExtraClass(data){

    var header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('/api/setUpExtraClass', data, {headers: header}).map(res => res.json());
  }
}
