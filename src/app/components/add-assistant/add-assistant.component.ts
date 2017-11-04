import { Component, OnInit } from '@angular/core';
import {RegisterService} from "../../services/register.service";
import {Assistant} from "../../models/Assistant";
import {DateModel, DatePickerOptions} from "ng2-datepicker";

@Component({
  selector: 'app-add-assistant',
  templateUrl: './add-assistant.component.html',
  styleUrls: ['./add-assistant.component.css']
})
export class AddAssistantComponent implements OnInit {

  assistant = new Assistant();
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

  //function to add assistants to the system
  addAssistant(){
    event.preventDefault();
    this.assistant.userRole = 'assistant';
    if(this.isMale){
      this.assistant.gender = "Male";
    }
    else{
      this.assistant.gender = "Female";
    }
    this.assistant.birthday = this.birthday.formatted;
    console.log(this.assistant.birthday);
    console.log(this.assistant);
    this.registerService.registerAssistant(this.assistant).subscribe(data => {
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
