import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { appRoutes } from "./routes";
import { RouterModule } from "@angular/router";
import { ApiService } from "./api.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { WalletComponent } from './wallet/wallet.component';
import { LogoComponent } from './logo/logo.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CrowdfundingComponent } from './crowdfunding/crowdfunding.component';
import { TransferComponent } from './transfer/transfer.component';
import { UserService } from "./user.service";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    WalletComponent,
    LogoComponent,
    SidebarComponent,
    CrowdfundingComponent,
    TransferComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
