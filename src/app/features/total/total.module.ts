import { NgModule } from '@angular/core';
import { TotalSummariesComponent } from './total-summaries/total-summaries.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TotalChartsComponent } from './total-charts/total-charts.component';
import { TotalSeriesComponent } from './total-series/total-series.component';
import { TotalMapComponent } from './total-map/total-map.component';



@NgModule({
  declarations: [TotalSummariesComponent, TotalChartsComponent, TotalSeriesComponent, TotalMapComponent],
  imports: [
    SharedModule
  ],
  exports: [TotalSummariesComponent, TotalChartsComponent, TotalMapComponent]
})
export class TotalModule { }
