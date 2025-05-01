import { enableProdMode, importProvidersFrom } from "@angular/core";
import { environment } from "./environments/environment";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app-routing.module";
import { provideRouter } from "@angular/router";
import {
  MatSelectCountryLangToken,
  MatSelectCountryModule,
} from "@angular-material-extensions/select-country";
import { provideMarkdown } from "ngx-markdown";
import { provideHttpClient } from "@angular/common/http";
if (environment.production) {
  enableProdMode();
}

document.addEventListener("DOMContentLoaded", () => {
  bootstrapApplication(AppComponent, {
    providers: [
      provideAnimations(),
      provideHttpClient(),
      provideRouter(routes),
      provideMarkdown(),
      importProvidersFrom(
        // this will execute the module's constructor (and register the icons)
        MatSelectCountryModule.forRoot("de")
      ),
      //{ provide: MatSelectCountryLangToken, useValue: "de" },
    ],
  }).catch((err) => console.error(err));
});
