import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [SearchComponent],
  imports: [
    SharedModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
