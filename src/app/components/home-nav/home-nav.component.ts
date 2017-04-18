import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from "../../services/authenticate.service";

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css']
})
export class HomeNavComponent implements OnInit {

  constructor(private auth: AuthenticateService) { }

  ngOnInit() {
    this.auth.setUser();
  }

}
