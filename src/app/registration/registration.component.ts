import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Eos } from "../../eos";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

  onSubmit(e) {
    e.preventDefault();

    // do something
  }

}
