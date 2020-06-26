import { AbstractControl, Validators, ValidationErrors } from '@angular/forms';
export class EmailValidators {
    
    static validEmail(control: AbstractControl): ValidationErrors | null {
        if (control.value && ! /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(control.value)) {
            return { validEmail: true }
        }
        else
            return null
    }
}