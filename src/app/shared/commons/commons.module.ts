import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDay, faArrowLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatChipsModule,
    NgxEchartsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule
  ]
})
export class CommonsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCalendarDay, faArrowLeft, faInfoCircle);
  }
 }
