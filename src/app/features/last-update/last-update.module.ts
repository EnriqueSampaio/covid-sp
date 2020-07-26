import { NgModule } from '@angular/core';
import { LastUpdateComponent } from './last-update/last-update.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [LastUpdateComponent],
  imports: [
    SharedModule
  ],
  exports: [LastUpdateComponent]
})
export class LastUpdateModule { }
