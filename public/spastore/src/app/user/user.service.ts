import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { User } from '../user/user.model';

import * as CONSTANTS from '../shared/global';

import { LoggedUser } from '../user/loggedUser.model';


@Injectable()

export class UserService {
    usersEndpoint: string = CONSTANTS.BASE_URL + CONSTANTS.USER_ENDPOINT;
    loginEndPoint: string = CONSTANTS.BASE_URL + '/token'

    currentlyLoggedUser: LoggedUser;
    public userChangedSource = new Subject<LoggedUser>();
    userChanged = this.userChangedSource.asObservable();




    constructor(private http: Http) { }

    login(loginUsername: string, password: string) {
        let user = {
            username: loginUsername,
            password: password
        }
        return this
            .http
            .post(this.loginEndPoint, user)
            .map((response: Response) => response.json());
    }

    create(user: User) {
        return this
            .http
            .post(this.usersEndpoint, user)
            .map((response: Response) => response.json());
    }

}