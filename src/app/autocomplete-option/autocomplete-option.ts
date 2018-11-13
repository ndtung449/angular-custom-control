import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ac-option',
  templateUrl: 'autocomplete-option.html',
  styleUrls: ['autocomplete-option.css'],
})
export class AutocompleteOptionComponent {
  @Input() value = '';

  private _isFocused = false;
  get isFocused () {
    return this._isFocused;
  }

  set isFocused(value: boolean) {
    this._isFocused = value;
    this.elementRef.nativeElement.focus();
  }

  constructor(private elementRef: ElementRef) { }


}
