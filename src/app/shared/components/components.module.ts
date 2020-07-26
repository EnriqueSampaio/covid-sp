import { NgModule } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { CardComponent } from './card/card.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [CardComponent],
  imports: [
    MatCardModule,
    FlexLayoutModule
  ],
  exports: [CardComponent]
})
export class ComponentsModule { }
