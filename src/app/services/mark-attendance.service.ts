import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class MarkAttendanceService {

  constructor(private http: Http) { }

  searchStudentId(studentId){
    var header = new Headers();

    header.append('Content-Type','application/json');
    return this.http.post('/api/searchStudentId', studentId, {headers: header}).map(res => res.json());
  }

}
