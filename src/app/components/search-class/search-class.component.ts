import { Component, OnInit } from '@angular/core';
import {ClassService} from "../../services/class.service";

@Component({
  selector: 'app-search-class',
  templateUrl: './search-class.component.html',
  styleUrls: ['./search-class.component.css']
})
export class SearchClassComponent implements OnInit {

  classes= [];
  searchCategories = ["Search All","Name", "Subject", "Teacher", "Batch", "Day"];
  noResults = false;
  constructor(private classService: ClassService) { }

  ngOnInit() {
    this.classService.getClasses().subscribe(data =>{
        console.log(data);
        if(data.length > 0){
          this.classes = data;
        }
      },
      error => {
        alert(error);
      });
  }

  searchClass(event){
    console.log(event.category);
    console.log(event.text);
    this.classService.getClassesByCategory(event).subscribe(data =>{
        console.log(data);
        if(data.length > 0){
          this.classes = data;
        }
      },
      error => {
        alert(error);
      });
  }

}
