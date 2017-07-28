import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoggedUser } from '../user/loggedUser.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser: LoggedUser

  constructor(private userService: UserService) {

    
  }

  ngOnInit() {
    this.userService.userChanged.subscribe(user => {
      this.loggedUser = user;
      console.log(user);
     });
  }

}
