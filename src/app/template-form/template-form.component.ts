import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-template-form',
  templateUrl: 'template-form.component.html'
})
export class TemplateFormComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  defaultOptions: Array<string> = [
    'One',
    'Two',
    'Three'
  ];
  filteredOptions: Array<string>;
  formChangeSubscription: Subscription;

  constructor() {
    this.filteredOptions = this.defaultOptions;
  }

  ngOnInit(): void {
    this.formChangeSubscription = this.form.valueChanges.subscribe(value => {
      if (value && value.documentType) {
        this.filteredOptions = this.defaultOptions.filter(x => x.toLocaleLowerCase().includes(value.documentType.toLocaleLowerCase()));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.formChangeSubscription) {
      this.formChangeSubscription.unsubscribe();
    }
  }
}
