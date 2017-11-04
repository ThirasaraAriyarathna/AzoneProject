import { Component, OnInit } from '@angular/core';
import {RegisterService} from "../../services/register.service";
import { Teacher } from "../../models/Teacher";
import {DateModel, DatePickerOptions} from "ng2-datepicker";

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  teacher = new Teacher();
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

  //function to add teachers to the system
  addTeacher(){
    event.preventDefault();
    this.teacher.userRole = 'teacher';
    if(this.isMale){
      this.teacher.gender = "Male";
    }
    else{
      this.teacher.gender = "Female";
    }
    this.teacher.birthday = this.birthday.formatted;
    console.log(this.teacher.birthday);
    console.log(this.teacher);
    this.registerService.registerTeacher(this.teacher).subscribe(data => {
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
