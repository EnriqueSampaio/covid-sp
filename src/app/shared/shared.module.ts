import { NgModule } from '@angular/core';
import { CommonsModule } from './commons/commons.module';
import { DirectivesModule } from './directives/directives.module';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonsModule,
    DirectivesModule,
    ComponentsModule
  ]
})
export class SharedModule { }
