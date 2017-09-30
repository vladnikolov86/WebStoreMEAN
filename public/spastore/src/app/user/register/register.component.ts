import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../user/models/user.model';
import { UserService } from '../services/user.service';
import { Validation } from '../../shared/services/validators';
import * as CONSTANTS from '../../shared/constants/global';
import { ToastrService } from '../../shared/services/toastr.service';

@Component({ selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.css'] })
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

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
      }, { validator: Validation.MatchPassword })
  }

  registerUser = function () {
    if (!this.registrationForm.valid) {
      this.toastr.error(CONSTANTS.NOTIFICATIONS.invalidRegistrationForm);
      return;
    }

    let user = new User(this.registrationForm.value);
    this
      .userService
      .create(user)
      .subscribe(data => {
        this.toastr.success(CONSTANTS.NOTIFICATIONS.registrationSuccess);
        this.router.navigate(['login']);
      }, error => {
        console.log(error)
        this.loading = false;
      });
  }

}
