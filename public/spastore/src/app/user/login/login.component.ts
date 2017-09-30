import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import * as CONSTANTS from '../../shared/constants/global';
import {ToastrService} from '../../shared/services/toastr.service';
import {CommonService} from '../../shared/services/common.service';


import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';


import {LoggedUser} from '../../user/models/loggedUser.model';

@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {

  constructor(public fb : FormBuilder, private userService : UserService, private authService : AuthenticationService, private commonService : CommonService, private toastr: ToastrService) {}

  public loginForm = this
    .fb
    .group({
      username: [
        "", Validators.required
      ],
      password: [
        "", Validators.required
      ],
      rememberMe: []
    });

  ngOnInit() {}

  loginUser = function () {
    let username = this.loginForm.value.username;
    let rememberMeChecked = this.loginForm.value.rememberMe;
    this
      .userService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(data => {
        let loggedUser = {
          username: username,
          role: data.role
        }
        this.currentlyLoggedUser = new LoggedUser(loggedUser);
        this
          .userService
          .userChangedSource
          .next(this.currentlyLoggedUser);
        this.loading = false;

        this.authService.username = username;
        this.authService.role = data.role;
        this.authService.isLogged = true;

        if (rememberMeChecked) {
          this.authService.storageInUse = 'localStorage';

          this
            .commonService
            .setInLocalStorage('currentUser', loggedUser);
        } else {
          this.authService.storageInUse = 'sessionStorage';

          this
            .commonService
            .setInSessionStorage('currentUser', loggedUser);
        }

      }, error => {
        console.log(error)
        this.toastr.error(error._body);
        this.loading = false;
      });
  }

}
