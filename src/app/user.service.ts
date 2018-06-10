import { Injectable } from '@angular/core';
let CryptoJS = require('crypto-js');

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getPrivateKey() {
    let enteredPassword = prompt('Enter your password');
    let encodedPrivateKey = localStorage.getItem('eos_password');
    let bytes = CryptoJS.AES.decrypt(encodedPrivateKey, enteredPassword);
    let decodedPrivateKey = bytes.toString(CryptoJS.enc.Utf8);

    return decodedPrivateKey;
  }
}
