import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

import { Country } from "@angular-material-extensions/select-country";
// import { Angulartics2GoogleAnalytics, Angulartics2Module } from "angulartics2";
import { GERMANY_COUNTRY } from "./examples/contants";
import { CommonModule } from "@angular/common";
import {
  AllComponent,
  DefaultComponent,
  AllFormControlComponent,
  MinimalComponent,
} from "./examples";
import { MarkdownModule } from "ngx-markdown";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "ngx-flexible-layout";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [
    CommonModule,
   // Angulartics2Module,
    FlexLayoutModule,
    MarkdownModule,
    AllComponent,
    AllFormControlComponent,
    DefaultComponent,
    MinimalComponent,
    RouterModule,
  ],
  providers: [
  //  Angulartics2GoogleAnalytics
  ]
})
export class AppComponent implements OnInit {
  title = "select-country";

  defaultValue = { ...GERMANY_COUNTRY };
  countryFormControl = new UntypedFormControl();
  countryRequiredFormControl = new UntypedFormControl(null, [
    Validators.required,
  ]);
  countryFormGroup: UntypedFormGroup;

  languageSelected = "es";
  showCallingCode = "false";

  countryMandatoryFormControl = new FormControl(this.defaultValue.name, [
    Validators.required,
  ]);

  predefinedCountries: Country[] = [
    {
      name: "Germany",
      alpha2Code: "DE",
      alpha3Code: "DEU",
      numericCode: "276",
      callingCode: "+49",
    },
    {
      name: "Greece",
      alpha2Code: "GR",
      alpha3Code: "GRC",
      numericCode: "300",
      callingCode: "+30",
    },
    {
      name: "France",
      alpha2Code: "FR",
      alpha3Code: "FRA",
      numericCode: "250",
      callingCode: "+33",
    },
    {
      name: "Belgium",
      alpha2Code: "BE",
      alpha3Code: "BEL",
      numericCode: "056",
      callingCode: "+32",
    },
  ];

  constructor(
  //  angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private formBuilder: UntypedFormBuilder
  ) {
 //   angulartics2GoogleAnalytics.startTracking();
  }

  ngOnInit(): void {
    this.countryFormGroup = this.formBuilder.group({
      country: [{ ...this.defaultValue }],
    });

    this.countryMandatoryFormControl.valueChanges.subscribe((country) => {
      console.log(
        "this.countryMandatoryFormControl.get('country').valueChanges",
        country
      );
    });

    this.countryFormGroup
      .get("country")
      .valueChanges.subscribe((country) =>
        console.log(
          "this.countryFormGroup.get('country').valueChanges",
          country
        )
      );

    this.countryFormControl.valueChanges.subscribe((country) =>
      console.log("this.countryFormControl.valueChanges", country)
    );
  }

  onCountrySelected($event: Country): void {
    console.log("onCountrySelected", $event);
  }
}
