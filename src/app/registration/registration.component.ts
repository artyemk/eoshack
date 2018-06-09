import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {
  public userName: string;
  public errorStr: string;

  constructor(
    public api: ApiService
  ) {

  }

  ngOnInit() {
  }

  onSubmit(e) {
    e.preventDefault();

    this.api.createAccount({
      userName: this.userName
    }).then(res => {
      console.log(res);
    }, (res) => {
      this.errorStr = res.errors[0].message;
    });
  }
}

