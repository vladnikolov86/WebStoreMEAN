export class User {
    username : string = 'Гост';
    password : string;
    name : string
    email : string;
    phone : string;
    address : string;
    officeName : string;
    corporatePhone : string;
    invoiceDetails : string;
    isCorporate : boolean = false;
    disclaimer : boolean;

    constructor(userInfo : any) {
        this.username = userInfo.username;
        this.password = userInfo.password;
        this.name = userInfo.firstName + userInfo.lastName;
        this.email = userInfo.email;
        this.phone = userInfo.phone;
        this.address = userInfo.address;
        this.officeName = userInfo.officeName;
        this.corporatePhone = userInfo.corporatePhone;
        this.invoiceDetails = userInfo.invoiceDetails;
        this.disclaimer = userInfo.disclaimer;
    }
}