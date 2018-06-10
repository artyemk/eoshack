import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { UserService } from "../user.service";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.less']
})
export class TransferComponent implements OnInit {

  public receiver: string;
  public amount: number;
  public currency: string;
  public memo: string;

  constructor(
    public api: ApiService,
    public user: UserService,
  ) { }

  ngOnInit() {
  }

  onSubmit(e) {
    e.preventDefault();

    this.api.transfer({
      userName: localStorage.getItem('eos_username'),
      privateKey: this.user.getPrivateKey(),
      receiver: this.receiver,
      amount: this.amount,
      currency: this.currency,
      memo: this.memo,
    });
  }

}
