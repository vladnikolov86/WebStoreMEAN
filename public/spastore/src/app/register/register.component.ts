import { Component, OnInit } from '@angular/core';

import {FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public fb:FormBuilder) { }

  public registerForm = this
    .fb
    .group({
      username: [
        "", Validators.required
      ],
      password: ["", Validators.required]
    });

  ngOnInit() {
  }

}
