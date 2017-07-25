import {Component, OnInit} from '@angular/core';

import {FormBuilder, Validators, FormControl} from '@angular/forms';
import * as CONSTANTS from '../../shared/global';
import {ToastrService} from '../../shared/toastr.service';
import {UserService} from '../user.service';


@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {

  constructor(public fb : FormBuilder, private userService : UserService,private toastr: ToastrService) {}

  public loginForm = this
    .fb
    .group({
      username: [
        "", Validators.required
      ],
      password: ["", Validators.required]
    });

  ngOnInit() {}

  loginUser = function () {
    console.log(this.loginForm.value)

     if (!this.loginForm.valid) {
      return;
    }


    let user : any= {};
    user.username = this.loginForm.value.username
    user.password = this.loginForm.value.password;

    //let user = new User(this.registrationForm.value);
    this
      .userService
      .login(user)
      .subscribe(data => {
        this
          .toastr
          .success(CONSTANTS.NOTIFICATIONS.loginSuccess);
          console.log(data)
      }, error => {
        console.log(error)
        this.loading = false;
      });
  }
}
