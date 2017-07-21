import {Component, OnInit} from '@angular/core';

import {FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {

  constructor(public fb : FormBuilder) {}

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
  }

}
