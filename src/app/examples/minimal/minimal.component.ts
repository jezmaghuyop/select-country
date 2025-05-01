import { Component } from "@angular/core";
import { Country, MatSelectCountryComponent } from "@angular-material-extensions/select-country";
import { MarkdownModule } from "ngx-markdown";

@Component({
  selector: "app-minimal",
  templateUrl: "./minimal.component.html",
  imports: [
    MarkdownModule,
    MatSelectCountryComponent
  ]
})
export class MinimalComponent {
  onCountrySelected($event: Country): void {
    console.log("Minimal example: onCountrySelected", $event);
  }
}
