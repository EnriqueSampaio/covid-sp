import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { CityComponent } from './city/city.component';
import { FeaturesModule } from '../features/features.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CityComponent],
  imports: [
    SharedModule,
    PublicRoutingModule,
    FeaturesModule
  ]
})
export class PublicModule { }
