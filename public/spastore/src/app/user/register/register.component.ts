import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';

import {User} from '../../user/user.model';
import {UserService} from '../user.service';
import {Validation} from '../../shared/validators';
import * as CONSTANTS from '../../shared/global';

@Component({selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.css']})
export class RegisterComponent implements OnInit {

  registrationForm : FormGroup;
  loading : boolean = false;

  constructor(private fb : FormBuilder, private userService : UserService) {}

  ngOnInit() {
    this.registrationForm = this
      .fb
      .group({
        username: [
          '',
          [
            Validators.required, Validators.minLength(5)
          ]
        ],
        firstName: [
          '',
          [
            Validators.required, Validators.minLength(3)
          ]
        ],
        lastName: [
          '',
          [
            Validators.required, Validators.minLength(3)
          ]
        ],
        email: [
          '',
          [Validators.required, Validation.MailFormat]
        ],
        phone: [
          '', Validators.required
        ],
        disclaimer: [
          '', Validators.requiredTrue
        ],
        password: [
          '',
          [
            Validators.required, Validators.minLength(4)
          ]
        ],
        confirmPassword: [
          '', Validators.required
        ],

        address: new FormControl(),
        officeName: new FormControl(),
        corporatePhone: new FormControl(),
        invoiceDetails: new FormControl()
      }, {validator: Validation.MatchPassword})
  }

  registerUser = function () {
    if (!this.registrationForm.valid) {
      return;
    }
    
    let user = new User(this.registrationForm.value);
    this
      .userService
      .create(user)
      .subscribe(data => {
        console.log('registered');
        console.log(data)
      }, error => {
        console.log(error)
        this.loading = false;
      });
  }

}
