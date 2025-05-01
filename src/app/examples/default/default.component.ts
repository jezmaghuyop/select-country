import { Component, OnInit } from "@angular/core";
import {
  Country,
  MatSelectCountryComponent,
} from "@angular-material-extensions/select-country";
import { GERMANY_COUNTRY } from "../contants";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MarkdownModule } from "ngx-markdown";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
  imports: [
    // other imports
    MarkdownModule,
    MatSelectCountryComponent,

    // Material FormField + Input
    MatFormFieldModule,
    MatInputModule,

    // forms
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DefaultComponent implements OnInit {
  defaultCountry: Country = { ...GERMANY_COUNTRY };

  countryFormGroup = new FormGroup({
    name: new FormControl(this.defaultCountry.name),
    alpha2Code: new FormControl(this.defaultCountry.alpha2Code, [
      Validators.required,
      Validators.pattern(/^[A-Z]{2}$/),
    ]),
    alpha3Code: new FormControl(this.defaultCountry.alpha3Code, [
      Validators.pattern(/^[A-Z]{3}$/),
    ]),
    numericCode: new FormControl(this.defaultCountry.numericCode, [
      Validators.pattern(/^\d+$/),
    ]),
    callingCode: new FormControl(this.defaultCountry.callingCode, [
      Validators.pattern(/^\+\d+$/),
    ]),
  });

  ngOnInit() {
    this.countryFormGroup.valueChanges.subscribe((change) => {
      if (this.countryFormGroup.valid) {
        this.defaultCountry = {
          name: this.countryFormGroup.value.name,
          alpha2Code: this.countryFormGroup.value.alpha2Code,
          alpha3Code: this.countryFormGroup.value.alpha3Code ?? "???",
          numericCode: this.countryFormGroup.value.numericCode ?? "???",
          callingCode: this.countryFormGroup.value.callingCode ?? "+??",
        };
      }
    });
  }

  onCountrySelected($event: Country): void {
    console.log("Default example: onCountrySelected", $event);
  }
}
