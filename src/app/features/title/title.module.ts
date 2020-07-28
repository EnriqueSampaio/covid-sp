import { NgModule } from '@angular/core';
import { TitleComponent } from './title/title.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [TitleComponent],
  imports: [
    SharedModule
  ],
  exports: [TitleComponent]
})
export class TitleModule { }
