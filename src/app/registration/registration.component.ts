import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from "../api.service";
import { Router } from "@angular/router";
let CryptoJS = require('crypto-js');

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {
  public userName: string;
  public password?: string;
  public step = 1;
  public errorStr = '';
  public publicKey?: string;
  public privateKey?: string;
  public checkPrivateKey?: string;

  constructor(
    public api: ApiService,
    public router: Router
  ) {}

  ngOnInit() {
  }

  nextStep() {
    this.step++;

    this.errorStr = '';
  }

  onUsernameSubmit(e) {
    e.preventDefault();

    if (this.userName.match(/[A-Z]/)) {
      this.errorStr = 'Uppercase letters are not allowed';

      return;
    }

    this.api.createAccount({
      userName: this.userName
    }).then(res => {
      this.publicKey = res.publicKey;
      this.privateKey = res.privateKey;

      this.nextStep();
    }, (res) => {
      this.errorStr = res.errors[0].message;
    });
  }

  privateKeySubmit(e) {
    e.preventDefault();

    this.nextStep();
  }

  checkPrivateKeySubmit(e) {
    e.preventDefault();

    if (this.checkPrivateKey === this.privateKey) {
      this.nextStep();
    } else {
      this.errorStr = `Entered key doesn't match with your private key`;
    }
  }

  clearError() {
    this.errorStr = '';
  }

  specifyPasswordSubmit(e) {
    e.preventDefault();

    if (this.password.length < 4) {
      this.errorStr = 'Password is too short';

      return;
    }

    localStorage.setItem('eos_password', CryptoJS.AES.encrypt(this.privateKey, this.password));
    localStorage.setItem('eos_username', this.userName);

    this.router.navigate(['wallet']);
  }
}

