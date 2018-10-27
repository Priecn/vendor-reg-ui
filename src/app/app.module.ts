import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { FetchDataService } from './fetch-data.service';
import { FilterSubCategoriesPipe } from './filter-sub-categories.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ServiceFormComponent,
    FilterSubCategoriesPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FetchDataService, FilterSubCategoriesPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
