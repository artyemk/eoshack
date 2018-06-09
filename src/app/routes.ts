import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { WalletComponent } from "./wallet/wallet.component";
import { RegistrationComponent } from "./registration/registration.component";

export const appRoutes: Routes = [
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: '',
    component: RegistrationComponent
  },
];