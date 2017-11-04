import { Component, OnInit } from '@angular/core';
import {Student} from "../../models/Student";
import {RegisterService} from "../../services/register.service";
import { DatePickerOptions, DateModel} from "ng2-datepicker";




@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  student = new Student();
  isShow = false;
  message: string;
  class = {'alert-success': false, 'alert-danger': false};
  isMale: boolean;
  birthday: DateModel;
  options: DatePickerOptions;
  today: Date;


  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.today = new Date();
    this.options = new DatePickerOptions({
      initialDate: this.today,
      maxDate: this.today
    });
  }


  //function to add students to the system
  addStudent(){
    event.preventDefault();
    this.student.userRole = 'student';
    this.student.classes = ["Chemistry", "Physics"];
    if(this.isMale){
      this.student.gender = "Male";
    }
    else{
      this.student.gender = "Female";
    }
    this.student.birthday = this.birthday.formatted;
    console.log(this.student.birthday);
    console.log(this.student);

    this.registerService.registerStudent(this.student).subscribe(data => {
      console.log(data.message);
      if (data.success){
        this.class['alert-success'] =true;
        this.class['alert-danger'] =false;
        this.isShow = true;
        this.message = data.message;
      }
      else{
        this.class['alert-danger'] =true;
        this.class['alert-success'] =false;
        this.isShow = true;
        this.message = data.message;

      }
    }, error => {
      alert(error);
    });
  }


}
