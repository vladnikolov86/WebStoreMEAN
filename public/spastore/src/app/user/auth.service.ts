import {Injectable} from '@angular/core';

import {CommonService} from './../shared/common.service';

@Injectable()

export class AuthenticationService {
    public username : string = 'Гост';
    public role : string = 'Клиент';
    public isLogged : boolean = false;
    public storageInUse : string;

    constructor(private commonService : CommonService) {}

    public init() {
        let currentUser = this
            .commonService
            .getFromLocalStorage('currentUser');
        if (currentUser) {
            this.username = currentUser.username;
            this.role = currentUser.role;
            this.isLogged = true;
        }
    }

    public logout() {
        this.username = 'Гост';
        this.role = '';
        this.isLogged = false;
        if (this.storageInUse == 'localStorage') {
            this
                .commonService
                .removeFromLocalStorage('currentUser');
        }

    }

}