import { Component, OnChanges, Input, SimpleChanges, OnInit, forwardRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ValidatorFn } from '@angular/forms';
import { AutocompleteOptionComponent } from '../autocomplete-option/autocomplete-option';

export function createAcAllowedValuesValidator(allowedValues: Array<string>): ValidatorFn {
  return (c: AbstractControl) => {
    const lowerAllowedValues = allowedValues.map(x => x.toLocaleLowerCase());
    const error = {
      rangeError: {
        given: c.value,
        allowed: allowedValues
      }
    };
    return lowerAllowedValues.includes(c.value ? c.value.toLocaleLowerCase() : '') ? null : error;
  };
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: 'autocomplete.html',
  styleUrls: ['autocomplete.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ],
})
export class AutocompleteComponent implements ControlValueAccessor, OnInit, OnChanges {
  searchControl = new FormControl();
  validateFn: Function;
  panelVisible = false;
  selectedOption: string;

  constructor() {
    this.setValidateFn();
  }

  @Input() allowedValues: Array<string> = [];

  @Input() options: Array<string> = [];

  propagateChange = (fn: any) => { };

  writeValue(value: string): void {
    this.searchControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value => {
      this.propagateChange(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allowedValues) {
      this.setValidateFn();
    }
  }

  handleSelect(option: string): void {
    this.searchControl.setValue(option);
    this.propagateChange(option);
  }

  setValidateFn() {
    this.validateFn = createAcAllowedValuesValidator(this.allowedValues);
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  onBlur(): void {
    setTimeout(() => this.panelVisible = false, 200);
  }

  onFocus(): void {
    this.panelVisible = true;
  }
}
