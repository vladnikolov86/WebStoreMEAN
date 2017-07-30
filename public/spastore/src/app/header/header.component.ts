import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {UserService} from '../user/user.service';
import {AuthenticationService} from '../user/auth.service';
import {LoggedUser} from '../user/loggedUser.model';
@Component({selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.css']})
export class HeaderComponent implements OnInit {

  loggedUser : LoggedUser;

  constructor(private userService : UserService, private authenticationService : AuthenticationService, private router : Router) {
    this
      .authenticationService
      .init();

  }

  public logout() {
    this
      .authenticationService
      .logout();
    this.loggedUser = null;
    this
      .router
      .navigate(['login']);
  }

  ngOnInit() {
    if (this.authenticationService.isLogged) {
      let user = {
        username: this.authenticationService.username,
        role: this.authenticationService.role
      }

      this.loggedUser = new LoggedUser(user);
    }

    this
      .userService
      .userChanged
      .subscribe(user => {
        this.loggedUser = user;
      });
  }

}
