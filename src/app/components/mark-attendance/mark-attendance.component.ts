import { Component, OnInit } from '@angular/core';
import {MarkAttendanceService} from "../../services/mark-attendance.service";

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.css']
})
export class MarkAttendanceComponent implements OnInit {

  noResults = false;
  haveResults = false;
  today = new Date();
  tday = this.today.toDateString();
  classes = new Object();
  student = new Object();
  classesFull = new Object();
  selectedClass: string;
  constructor(private markAttendanceService: MarkAttendanceService) { }

  ngOnInit() {
  }

  searchStudentId(studentId: string){
    this.noResults = false;
    this.haveResults = false;
    console.log(this.today.toDateString());
    console.log(studentId);
    this.markAttendanceService.searchStudentId({id: studentId}).subscribe(data => {
      console.log(data);
      if (data){
        this.classes = data.classes;
        this.student = data.student;
        this.classesFull = data.classesFull;
        this.haveResults = true;
        document.getElementById("openModalButton").click();
      }
      else{
        this.noResults = true;
      }

    }, error => {
      alert(error);
    });
  }

  selectClass(id){
    this.selectedClass = id;
    document.getElementById("openModalButton").click();
  }

  markAttendance(id){

  }
  topup(id){

  }

}
