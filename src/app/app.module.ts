import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
