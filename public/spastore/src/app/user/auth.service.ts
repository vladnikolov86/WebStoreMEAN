import {Injectable} from '@angular/core';


@Injectable()

export class UserService {
   public username : string = 'Гост';
   public role : string = 'Клиент';
   public isLogged: boolean = false;

}