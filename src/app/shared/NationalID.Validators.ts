import { AbstractControl, Validators, ValidationErrors } from '@angular/forms';
export class NationalIDValidators {
    static validNationalID(control: AbstractControl): ValidationErrors | null {
        if ( control.value &&  !RegExp("^((?!(0))[0-9]{14})$").test(control.value)) {
            return { validNationalID: true }
        }
        else
            return null
    }
}