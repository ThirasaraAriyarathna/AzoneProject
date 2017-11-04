import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClassService} from "../../services/class.service";
import {AuthenticateService} from "../../services/authenticate.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.css']
})
export class ClassViewComponent implements OnInit {

  user = new User();
  isLogged: boolean;
  id: string;
  classe = new Object();
  studentNo: number;
  isActivated: boolean;
  isShow = false;
  message: string;
  today = new Date();
  classDay: Date;
  can_activate = false;

  css = {'alert-success': false, 'alert-danger': false};

  constructor(private route: ActivatedRoute, private classService: ClassService, private router: Router, private authenticateService: AuthenticateService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.authenticateService.loggedIn()) {
        this.authenticateService.getUser().subscribe(data =>{
          console.log(data);
            this.user.username = data.username;
            this.user.email = data.email;
            this.user.userRole = data.role;
            this.user.userId = data.id;
            this.isLogged = true;
            this.classService.getClass({id: this.id}).subscribe(data =>{
                console.log(data);
                if(data){
                  this.classe = data;
                  this.isActivated = data.is_active;
                  this.classDay = new Date(data.start_date);
                  console.log(this.classDay);
                  if (this.classDay.getDay() == this.today.getDay()){
                    this.can_activate = true;
                  }
                  console.log(this.classe);
                }
              },
              error => {
                alert(error);
              });

          },
          error => {
            alert(error);
          });

      }

      else{
        this.isLogged = false;
        //this.router.navigate(['/home']);
      }

    });


  }

  activateClass(id){
    this.classService.activateClass({id: id, date: new Date()}).subscribe(data =>{
        console.log(data);
        if(data.success){
          this.isActivated = true;
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
      },
      error => {
        alert(error);
      });
  }

  deactivateClass(id){
    this.classService.deactivateClass({id: id}).subscribe(data =>{
        console.log(data);
        if(data.success){
          this.isActivated = false;
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
      },
      error => {
        alert(error);
      });
  }

  deleteClass(id){
    this.classService.deleteClass({id: id}).subscribe(data =>{
        console.log(data);
        if(data.success){
          this.css['alert-success'] =true;
          this.css['alert-danger'] =false;
          this.isShow = true;
          this.message = data.message;
          this.router.navigate(['/searchClass']);
        }
        else{
          this.css['alert-danger'] =true;
          this.css['alert-success'] =false;
          this.isShow = true;
          this.message = data.message;
        }
      },
      error => {
        alert(error);
      });
  }

  registerClass(data){
    this.classService.registerClass(data).subscribe(data =>{
        console.log(data);
        if(data.success){
          this.css['alert-success'] =true;
          this.css['alert-danger'] =false;
          this.isShow = true;
          this.message = data.message;
          this.router.navigate(['/searchClass']);
        }
        else{
          this.css['alert-danger'] =true;
          this.css['alert-success'] =false;
          this.isShow = true;
          this.message = data.message;
        }
      },
      error => {
        alert(error);
      });
  }

  setUpExtraClass(id){
    this.classService.setUpExtraClass({id: id, date: new Date()}).subscribe(data =>{
        console.log(data);
        if(data.success){
          this.isActivated = true;
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
      },
      error => {
        alert(error);
      });
  }

}
