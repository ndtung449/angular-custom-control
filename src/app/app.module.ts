import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AutocompleteComponent } from './autocomplete/autocomplete';
import { AutocompleteOptionComponent } from './autocomplete-option/autocomplete-option';
import { AcAllowedValuesDirective } from './ac-allowed-values.directive';


@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    TemplateFormComponent,
    ReactiveFormComponent,
    AutocompleteComponent,
    AutocompleteOptionComponent,
    AcAllowedValuesDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
