import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailySummariesComponent } from './daily-summaries/daily-summaries.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DailySeriesComponent } from './daily-series/daily-series.component';
import { DailyChartsComponent } from './daily-charts/daily-charts.component';



@NgModule({
  declarations: [DailySummariesComponent, DailySeriesComponent, DailyChartsComponent],
  imports: [
    SharedModule
  ],
  exports: [DailySummariesComponent, DailyChartsComponent]
})
export class DailyModule { }
