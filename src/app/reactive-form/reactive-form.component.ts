import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createAcAllowedValuesValidator } from '../autocomplete/autocomplete';

@Component({
  selector: 'app-reactive-form',
  templateUrl: 'reactive-form.component.html',
})
export class ReactiveFormComponent implements OnInit {
  form: FormGroup;
  documentTypes: Array<string> = [
    'One',
    'Two',
    'Three'
  ];

  filteredDocumentTypes: Array<string>;

  constructor(private formBuilder: FormBuilder) {
    this.filteredDocumentTypes = this.documentTypes;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      documentType: ['', createAcAllowedValuesValidator(this.documentTypes)]
    });

    this.form.controls.documentType.valueChanges.subscribe(value => {
      this.filteredDocumentTypes = this.documentTypes.filter(x => x.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    });
  }
}
