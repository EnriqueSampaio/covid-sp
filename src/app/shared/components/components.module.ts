import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { CommonsModule } from '../commons/commons.module';
import { DirectivesModule } from '../directives/directives.module';



@NgModule({
  declarations: [CardComponent, BackButtonComponent],
  imports: [
    CommonsModule,
    DirectivesModule
  ],
  exports: [CardComponent, BackButtonComponent]
})
export class ComponentsModule { }
