import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { DropdownValue } from "../../models/DropdownValue";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input()
  values: DropdownValue[];


  temp = new DropdownValue('6',"Thirasara");

  @Output()
  changeValue = new EventEmitter<Number>();


  constructor() { }

  ngOnInit() {
  }

  select(value){
    this.changeValue.emit(value.selectedIndex);
    console.log(value.selectedIndex);
  }
}
