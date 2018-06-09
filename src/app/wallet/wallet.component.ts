import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
let CryptoJS = require('crypto-js');

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.less']
})
export class WalletComponent implements OnInit {

  errorStr: string;

  constructor(
    public api: ApiService
  ) { }

  ngOnInit() {
    let enteredPassword = prompt('Enter your password');
    let encodedPrivateKey = localStorage.getItem('eos_password');
    let bytes = CryptoJS.AES.decrypt(encodedPrivateKey, enteredPassword);
    let decodedPrivateKey = bytes.toString(CryptoJS.enc.Utf8);

    this.api.getBalance({
      privateKey: decodedPrivateKey,
      userName: localStorage.getItem('eos_username')
    }).then((res) => {

    }, (res) => {
      this.errorStr = res.errors[0];
    });
  }

}
