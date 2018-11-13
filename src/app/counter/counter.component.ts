import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

export function createValidateCounterRange(minValue: number, maxValue: number) {
    return function validateCounterRange(c: FormControl) {
        const err = {
            rangeError: {
                given: c.value,
                min: minValue,
                max: maxValue,
            }
        };

        return c.value > maxValue || c.value < minValue ? err : null;
    };
}

@Component({
    selector: 'app-counter',
    template: `
  <button (click)="increment()">+</button>
  {{value}}
  <button (click)="decrement()">-</button>
  `,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CounterComponent),
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterComponent),
      multi: true
    }
  ]
})
export class CounterComponent implements ControlValueAccessor, OnChanges {
    value = 0;

    validateFn: Function;

    @Input()
    counterRangeMax: number;

    @Input()
    counterRangeMin: number;

    constructor() {
      this.validateFn = createValidateCounterRange(this.counterRangeMin, this.counterRangeMax);
    }

    propagateChange = (fn: any) => { };

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void { }

    writeValue(value: any): void {
        if (value) {
            this.value = value;
        }
    }

    increment(): void {
        this.value++;
        this.propagateChange(this.value);
    }

    decrement(): void {
        this.value--;
        this.propagateChange(this.value);
    }

    ngOnChanges(changes): void {
        if (changes.counterRangeMin || changes.counterRangeMax) {
            this.validateFn = createValidateCounterRange(this.counterRangeMin, this.counterRangeMax);
        }
    }

    validate(c: FormControl): Function {
        return this.validateFn(c);
    }
}
