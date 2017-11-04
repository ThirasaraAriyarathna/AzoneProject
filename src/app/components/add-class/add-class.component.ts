import { Component, OnInit } from '@angular/core';
import {Class} from "../../models/Class";
import {DropdownValue} from "../../models/DropdownValue";
import { DatePickerOptions, DateModel} from "ng2-datepicker";
import {ClassService} from "../../services/class.service";

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  class = new Class();
  tdrops: DropdownValue[];
  bdrops: DropdownValue[];
  sdrops: DropdownValue[];
  isShow = false;
  message: string;
  css = {'alert-success': false, 'alert-danger': false};
  startDate: DateModel;
  endDate: DateModel;
  optionsStart: DatePickerOptions;
  optionsEnd: DatePickerOptions;
  today: Date;
  endDay: Date;
  y: number;
  m: number;
  d: number;

  constructor(private classService: ClassService) {

  }

  ngOnInit() {

    this.classService.getTeachers().subscribe(data =>{
        console.log(data);
        this.tdrops = []
        if(data.length > 0){
          for (let teacher of data){
            var item = new DropdownValue(teacher._id, teacher.first_name.concat(' ',teacher.last_name) );
            item.description = teacher.description;
            this.tdrops.push(item);
          }
        }

      },
      error => {
        alert(error);
      });
    this.classService.getBatches().subscribe(data =>{
        console.log(data);
      if(data.length > 0){
        this.bdrops = [];
        for (let batch of data){
          var item = new DropdownValue(batch._id, batch.name );
          this.bdrops.push(item);
        }
      }

      },
      error => {
        alert(error);
      });
    this.classService.getSubjects().subscribe(data =>{
        console.log(data);
      if(data.length > 0){
        this.sdrops = [];
        for (let subject of data){
          var item = new DropdownValue(subject._id, subject.name );
          this.sdrops.push(item);
        }
      }

      },
      error => {
        alert(error);
      });


    this.today = new Date();
    this.optionsStart = new DatePickerOptions({
      initialDate: this.today
    });

    this.endDay = new Date();
    this.endDay.setFullYear(this.today.getFullYear()+10, 0, 0);
    console.log(this.endDay)
    this.optionsEnd = new DatePickerOptions({
      initialDate: this.today
    });

  }

  addClass(){
    event.preventDefault();

    console.log(this.class);

    if(this.class.teacherId == ""){
      this.css['alert-danger'] =true;
      this.css['alert-success'] =false;
      this.isShow = true;
      this.message = "Please select a value for Teacher";
    }
    else if(this.class.batchId == ""){
      this.css['alert-danger'] =true;
      this.css['alert-success'] =false;
      this.isShow = true;
      this.message = "Please select a value for Batch";
    }
    else if(this.class.subjectId == ""){
      this.css['alert-danger'] =true;
      this.css['alert-success'] =false;
      this.isShow = true;
      this.message = "Please select a value for Subject";
    }
    else{
      this.class.startDate = this.startDate.formatted;
      this.class.endDate = this.endDate.formatted;
      this.classService.addClass(this.class).subscribe(data => {
        console.log(data.message);
        if (data.success){
          this.css['alert-success'] =true;
          this.css['alert-danger'] =false;
          this.isShow = true;
          this.message = data.message;
        }
        else{
          this.css['alert-danger'] =true;
          this.css['alert-success'] =false;
          this.isShow = true;
          this.message = data.message;

        }
      }, error => {
        alert(error);
      });
    }

  }

  setTeacher(value: number){
    console.log(value);
    if(value == 0){
      this.class.teacherId = "";
      this.class.teacherName= "";
      this.class.teacherDescription= "";
    }
    else{
      this.class.teacherId = this.tdrops[value-1].id;
      this.class.teacherName= this.tdrops[value-1].value;
      this.class.teacherDescription= this.tdrops[value-1].description;
    }


  }
  setBatch(value: number){
    console.log(value);
    if(value == 0){
      this.class.teacherId = "";
      this.class.teacherName= "";
    }
    else{
      this.class.batchId = this.bdrops[value-1].id;
      this.class.batchName= this.bdrops[value-1].value;
    }


  }
  setSubject(value: number){
    console.log(value);
    if(value == 0){
      this.class.teacherId = "";
      this.class.teacherName= "";
    }
    else{
      this.class.subjectId = this.sdrops[value-1].id;
      this.class.subjectName= this.sdrops[value-1].value;
    }


  }

}
