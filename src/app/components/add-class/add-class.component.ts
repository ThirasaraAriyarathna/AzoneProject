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
  teachers: any[];
  batches: any[];
  subjects: any[];
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
        this.teachers = data;
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
    this.optionsEnd = new DatePickerOptions({
      initialDate: this.today,
      maxDate: this.endDay,
      minDate: this.today

    });

    var temp1 = new DropdownValue('1','Ariyarathna');
    var temp2 = new DropdownValue('2','Janaka');
    var temp3 = new DropdownValue('3','Hiran');
    var temp4 = new DropdownValue('4','Kusal');
    this.tdrops = [];
    this.tdrops.push(temp1, temp2, temp3, temp4);
    this.class.teacherId = this.tdrops[0].id;
    this.class.teacherName = this.tdrops[0].value;
  }

  addClass(){
    event.preventDefault();

    console.log(this.class.name);

    console.log(this.class.teacherId);
  }

  setTeacher(value: number){
    console.log(value);
    console.log(this.startDate);
    this.class.teacherId = this.tdrops[value].id;
    this.class.teacherName= this.tdrops[value].value;

  }
  setBatch(value: number){
    console.log(value);
    this.class.teacherId = this.tdrops[value].id;
    this.class.teacherName= this.tdrops[value].value;

  }
  setSubject(value: number){
    console.log(value);
    this.class.teacherId = this.tdrops[value].id;
    this.class.teacherName= this.tdrops[value].value;

  }

}
