export class LoggedUser {
    username : string = 'Гост';
    role: string;

    constructor(userInfo : any) {
        this.username = userInfo.username;
        this.role = userInfo.role;
    }
}