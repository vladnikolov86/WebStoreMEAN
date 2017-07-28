import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import * as CONSTANTS from '../../shared/global';
import {ToastrService} from '../../shared/toastr.service';
import {UserService} from '../user.service';


import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';

import { LoggedUser } from '../../user/loggedUser.model';

@Component({ selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css'] })
export class LoginComponent implements OnInit {


  constructor(public fb: FormBuilder, private userService: UserService) { }

  public loginForm = this
    .fb
    .group({
      username: [
        "", Validators.required
      ],
      password: ["", Validators.required]
    });

  ngOnInit() { }

  loginUser = function () {
    console.log(this.loginForm.value)  
    this
      .userService
      .login('vvn050','parola')
      .subscribe(data => {
        let loggedUser = {
          username: 'vvn050',
          role:data.role
        }
        this.currentlyLoggedUser = new LoggedUser(loggedUser);
        this.userService.userChangedSource.next(this.currentlyLoggedUser);

        console.log(data)
      }, error => {
        console.log(error)
        this.loading = false;
      });
  }

}
