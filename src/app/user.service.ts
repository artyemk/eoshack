import { Injectable } from '@angular/core';
let CryptoJS = require('crypto-js');

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public privateKey: string;

  constructor() { }

  getPrivateKey() {
    if (!this.privateKey) {
      let enteredPassword = prompt('Enter your password');
      let encodedPrivateKey = localStorage.getItem('eos_password');
      let bytes = CryptoJS.AES.decrypt(encodedPrivateKey, enteredPassword);

      this.privateKey = bytes.toString(CryptoJS.enc.Utf8);
    }

    return this.privateKey;
  }
}
