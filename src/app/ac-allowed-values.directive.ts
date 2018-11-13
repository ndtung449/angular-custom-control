import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { createAcAllowedValuesValidator } from './autocomplete/autocomplete';

@Directive({
  selector: '[appAcAllowedValues]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AcAllowedValuesDirective),
      multi: true,
    }
  ]
})
export class AcAllowedValuesDirective implements Validator {

  @Input('appAcAllowedValues') allowedValues: Array<string>;

  validate(control: AbstractControl): ValidationErrors {
    const validationResult = this.allowedValues
      ? createAcAllowedValuesValidator(this.allowedValues)(control)
      : null;
    return validationResult;
  }
}
