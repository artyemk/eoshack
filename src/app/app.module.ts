import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EosService } from './eos.service';

// https://github.com/EOSIO/eosjs#browser
const Eos = require('../../dist/eosjs/dist/eos.js');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
      {
        provide: EosService,
        useExisting: Eos
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
