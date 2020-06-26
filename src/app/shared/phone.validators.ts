import { AbstractControl, Validators, ValidationErrors } from '@angular/forms';
export class PhoneValidators {
    static validPhone(control: AbstractControl): ValidationErrors | null {
        if (control.value &&!RegExp("^(010|011|012)[0-9]{8}$").test(control.value)) {
            return { validPhone: true }
        }
        else
            return null
    }
}