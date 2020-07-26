import { NgModule } from '@angular/core';
import { TotalModule } from 'src/app/features/total/total.module';
import { LayoutModule } from 'src/app/features/layout/layout.module';
import { LastUpdateModule } from '../features/last-update/last-update.module';
import { TitleModule } from '../features/title/title.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ],
  exports: [
    TotalModule,
    LayoutModule,
    LastUpdateModule,
    TitleModule
  ]
})
export class FeaturesModule { }
