import {AbstractControl, FormControl} from '@angular/forms';
export class Validation {

    static MatchPassword(AC : AbstractControl) {

        let password = AC
            .get('password')
            .value;
        let confirmPassword = AC
            .get('confirmPassword')
            .value;
        if (password != confirmPassword) {
            AC
                .get('confirmPassword')
                .setErrors({MatchPassword: true});

            AC
                .get('password')
                .setErrors({MatchPassword: true});
        } else {
            AC
                .get('password')
                .setErrors(null);

            AC
                .get('confirmPassword')
                .setErrors(null);
        }
    }

    static MailFormat(control : FormControl) {
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!control.value || (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value)))) {
            return {"incorrectMailFormat": true};
        }

        return null;
    }
}