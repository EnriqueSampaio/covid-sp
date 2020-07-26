import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { MatChipsModule } from '@angular/material/chips';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [
    CommonModule,
    ComponentsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatChipsModule,
    NgxEchartsModule
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCalendarDay)
  }
 }
