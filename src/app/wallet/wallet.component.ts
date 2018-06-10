import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from "../api.service";
import { UserService } from "../user.service";
let CryptoJS = require('crypto-js');

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class WalletComponent implements OnInit {

  errorStr: string;
  rows: { name: string; value: number; }[];

  constructor(
    public api: ApiService,
    public user: UserService,
  ) { }

  ngOnInit() {
    this.api.getBalance({
      privateKey: this.user.getPrivateKey(),
      userName: localStorage.getItem('eos_username')
    }).then((res) => {
      this.rows = res.map(item => {
        let arr = item.split(' ');

        return {
          name: arr[1],
          value: arr[0]
        }
      });
    }, (res) => {
      this.errorStr = res.errors[0];
    });
  }

}
