import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from "../../services/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticateService: AuthenticateService) { }

  ngOnInit() {
    if(this.authenticateService.loggedIn()){
      this.authenticateService.getUser().subscribe(data =>{
        console.log(data);
      }, error => {
        alert(error);
      });
      console.log("You are logged in");
    }
    else{
      console.log("You are not logged in");
    }
  }



}
