import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { InnerPagesComponent } from './inner-pages/inner-pages.component';



@NgModule({
  declarations: [InnerPagesComponent],
  imports: [
    SharedModule
  ],
  exports: [InnerPagesComponent]
})
export class LayoutModule { }
