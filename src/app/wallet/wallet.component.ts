import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
let CryptoJS = require('crypto-js');

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.less']
})
export class WalletComponent implements OnInit {

  constructor(
    public api: ApiService
  ) { }

  ngOnInit() {
    this.api.getBalance({
      privateKey: CryptoJS.AES.decrypt(localStorage.getItem('eos_password'), prompt('Enter your password')),
      userName: localStorage.getItem('eos_username')
    }).then((res) => {

    }, (res) => {
      console.log(res);
    });
  }

}
