import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.css']})
export class RegisterComponent implements OnInit {

  mailFormat(control : FormControl) {
    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!control.value || (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value)))) {
      return {"incorrectMailFormat": true};
    }

    return null;
  }

  registrationForm : FormGroup;

  constructor(private fb : FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this
      .fb
      .group({
        firstName: [
          '',
          [Validators.required,Validators.minLength(3)]
        ],
        lastName: [
          '',
          [Validators.required,Validators.minLength(3)]
        ],
        email: [
          '',
          [Validators.required, this.mailFormat]
        ],
        phone: [
          '', Validators.required
        ],
        address: new FormControl(),
        officeName: new FormControl(),
        corporatePhone: new FormControl(),
        invoiceDetails: new FormControl()
      })
  }

  registerUser = function () {
    console.log(this.registrationForm)
  }

}
