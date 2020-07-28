import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [LoadingComponent],
  imports: [
    SharedModule
  ],
  exports: [LoadingComponent]
})
export class LoadingModule { }
