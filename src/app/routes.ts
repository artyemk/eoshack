import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { WalletComponent } from "./wallet/wallet.component";
import { RegistrationComponent } from "./registration/registration.component";
import { CrowdfundingComponent } from "./crowdfunding/crowdfunding.component";
import { TransferComponent } from "./transfer/transfer.component";

export const appRoutes: Routes = [
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: 'crowdfunding',
    component: CrowdfundingComponent
  },
  {
    path: 'transfer',
    component: TransferComponent
  },
  {
    path: '',
    component: RegistrationComponent
  },
];