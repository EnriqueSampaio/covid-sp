import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityComponent } from './city/city.component';

const routes: Routes = [{ path: 'city/:id', pathMatch: 'full', component: CityComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
