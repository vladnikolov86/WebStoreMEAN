import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {User} from '../user/user.model';

import * as CONSTANTS from '../shared/global';

@Injectable()

export class UserService {
    usersEndpoint : string = CONSTANTS.BASE_URL + CONSTANTS.USER_ENDPOINT;
    loginEndPoint: string = CONSTANTS.BASE_URL + CONSTANTS.LOGIN_ENDPOINT;
    constructor(private http : Http) {}

    create(user : User) {
        return this
            .http
            .post(this.usersEndpoint, user)
            .map((response : Response) => response.json());
    }

    login(user: any) {
        return this
            .http
            .post(this.loginEndPoint, user)
            .map((response : Response) => response.json());
    }

}