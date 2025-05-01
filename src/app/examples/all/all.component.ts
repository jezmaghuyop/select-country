import { Component, OnInit } from "@angular/core";
import {
  Country,
  MatSelectCountryComponent,
} from "@angular-material-extensions/select-country";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MarkdownModule } from "ngx-markdown";

import { CommonModule } from "@angular/common";

// Angular Material modules:
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
  selector: "app-all",
  templateUrl: "./all.component.html",
  styleUrls: ["./all.component.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MarkdownModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,

    MatSelectCountryComponent,
  ],
})
export class AllComponent implements OnInit {
  selectablecountries: Country[] = [
    {
      name: "Afghanistan",
      alpha2Code: "AF",
      alpha3Code: "AFG",
      numericCode: "004",
      callingCode: "+93",
    },
    {
      name: "Åland Islands",
      alpha2Code: "AX",
      alpha3Code: "ALA",
      numericCode: "248",
      callingCode: "+358",
    },
    {
      name: "Albania",
      alpha2Code: "AL",
      alpha3Code: "ALB",
      numericCode: "008",
      callingCode: "+355",
    },
  ];

  appearance: "fill" | "outline" = "outline";
  countries: Country[] = [];
  label: string = "Label";
  placeHolder = "Select country";
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  tabIndex: number | string;
  class: string;
  itemsLoadSize: number = 20;
  loading: boolean;
  showCallingCode = false;
  excludedCountries: Country[] = [];
  language: string;
  name: string = "country";
  error?: string | undefined;
  cleareable: boolean = false;
  extendWidth: boolean = false;
  _panelWidth?: string | undefined;
  hint?: string | undefined;

  // helper variables
  panelWidth: number = 100;
  panelDisabled = true;
  _countries: string[];
  _excludedCountries: string[];

  availableLanguages: { value: string; viewValue: string }[] = [
    { value: "br", viewValue: "Breton" },
    { value: "be", viewValue: "Belarusian" },
    { value: "de", viewValue: "German" },
    { value: "en", viewValue: "English" },
    { value: "es", viewValue: "Spanish" },
    { value: "fr", viewValue: "French" },
    { value: "hr", viewValue: "Croatian" },
    { value: "hu", viewValue: "Hungarian" },
    { value: "it", viewValue: "Italian" },
    { value: "gl", viewValue: "Galician" },
    { value: "ca", viewValue: "Catalan" },
    { value: "eu", viewValue: "Basque" },
    { value: "nl", viewValue: "Flemish" },
    { value: "pt", viewValue: "Portuguese" },
    { value: "ru", viewValue: "Russian" },
    { value: "uk", viewValue: "Ukrainian" },
  ];
  languageControl = new FormControl("en");
  countriesControl = new FormControl({
    value: this.countries,
    disabled: false,
  });
  excludedCountriesControl = new FormControl({
    value: this.excludedCountries,
    disabled: false,
  });

  countryFormGroup = new FormGroup({
    appearance: new FormControl({ value: "outline", disabled: false }, [
      Validators.required,
    ]),
    // countries: new FormControl(),
    label: new FormControl({ value: "Label", disabled: false }, [
      Validators.required,
    ]),
    placeHolder: new FormControl("Select country", [Validators.required]),
    required: new FormControl(),
    disabled: new FormControl(),
    readonly: new FormControl(),
    class: new FormControl(),
    itemsLoadSize: new FormControl(this.itemsLoadSize),
    loading: new FormControl(),
    showCallingCode: new FormControl(false, [Validators.required]),
    // excludedCountries: new FormControl(),
    name: new FormControl("country", [Validators.required]),
    error: new FormControl(),
    cleareable: new FormControl(false, [Validators.required]),
    extendWidth: new FormControl(false, [Validators.required]),
    panelWidth: new FormControl(this.panelWidth),
    panelDisabled: new FormControl(this.panelDisabled, [Validators.required]),
    hint: new FormControl(),
    lang: this.languageControl,
    countries: this.countriesControl,
    excludedCountries: this.excludedCountriesControl,
  });

  ngOnInit() {
    this.countryFormGroup.valueChanges.subscribe((change) => {
      if (this.countryFormGroup.valid) {
        if (this.appearance !== this.countryFormGroup.value.appearance) {
          this.appearance = this.countryFormGroup.value.appearance as
            | "fill"
            | "outline";
        }
        if (this.label !== this.countryFormGroup.value.label) {
          this.label = this.countryFormGroup.value.label;
        }
        if (this.placeHolder !== this.countryFormGroup.value.placeHolder) {
          this.placeHolder = this.countryFormGroup.value.placeHolder;
        }
        if (this.class !== this.countryFormGroup.value.class) {
          this.class = this.countryFormGroup.value.class;
        }
        if (this.name !== this.countryFormGroup.value.name) {
          this.name = this.countryFormGroup.value.name;
        }
        if (this.error !== this.countryFormGroup.value.error) {
          this.error = this.countryFormGroup.value.error;
        }
        if (this.required !== this.countryFormGroup.value.required) {
          this.required = this.countryFormGroup.value.required;
        }
        if (this.disabled !== this.countryFormGroup.value.disabled) {
          this.disabled = this.countryFormGroup.value.disabled;
        }
        if (this.readonly !== this.countryFormGroup.value.readonly) {
          this.readonly = this.countryFormGroup.value.readonly;
        }
        if (
          this.showCallingCode !== this.countryFormGroup.value.showCallingCode
        ) {
          this.showCallingCode = this.countryFormGroup.value.showCallingCode;
        }
        if (this.cleareable !== this.countryFormGroup.value.cleareable) {
          this.cleareable = this.countryFormGroup.value.cleareable;
        }
        if (this.extendWidth !== this.countryFormGroup.value.extendWidth) {
          this.extendWidth = this.countryFormGroup.value.extendWidth;
        }
        if (this.loading !== this.countryFormGroup.value.loading) {
          this.loading = this.countryFormGroup.value.loading;
        }
        if (this.language !== this.countryFormGroup.value.lang) {
          this.language = this.countryFormGroup.value.lang;
        }
        if (this.panelWidth !== this.countryFormGroup.value.panelWidth) {
          this.panelWidth = this.countryFormGroup.value.panelWidth;
          this._panelWidth = this.panelWidth + "px";
        }
        if (this.panelDisabled !== this.countryFormGroup.value.panelDisabled) {
          this.panelDisabled = this.countryFormGroup.value.panelDisabled;
          this._panelWidth = this.panelDisabled
            ? undefined
            : this.panelWidth + "px";
        }
        if (this.hint !== this.countryFormGroup.value.hint) {
          this.hint = this.countryFormGroup.value.hint;
        }
        if (this.itemsLoadSize !== this.countryFormGroup.value.itemsLoadSize) {
          this.itemsLoadSize = this.countryFormGroup.value.itemsLoadSize;
        }
        if (
          this._countries !==
          (this.countryFormGroup.value.countries as unknown as string[])
        ) {
          this._countries = this.countryFormGroup.value
            .countries as unknown as string[];
          this.countries = this.selectablecountries.filter((el) =>
            this._countries.includes(el.alpha2Code)
          );
        }
        if (
          this._excludedCountries !==
          (this.countryFormGroup.value.excludedCountries as unknown as string[])
        ) {
          this._excludedCountries = this.countryFormGroup.value
            .excludedCountries as unknown as string[];
          this.excludedCountries = this.selectablecountries.filter((el) =>
            this._excludedCountries.includes(el.alpha2Code)
          );
        }
      }
    });
  }

  onCountrySelected($event: Country): void {
    console.log("All example: onCountrySelected", $event);
  }
}
