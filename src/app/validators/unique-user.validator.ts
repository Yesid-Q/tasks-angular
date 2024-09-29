import type { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export function uniqueUserValidators(field: string): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
        const users = (formArray as FormArray).controls.map(control => (control.get(field)?.value as string)?.toLowerCase());
        const duplicateNames = users.filter((name, index) => users.indexOf(name) !== index);
        return duplicateNames.length > 0 ? { duplicate: true } : null;
    };

}