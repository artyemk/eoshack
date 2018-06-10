import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-crowdfunding',
  templateUrl: './crowdfunding.component.html',
  styleUrls: ['./crowdfunding.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CrowdfundingComponent implements OnInit {
  acceptedTokens: {name: string; rate: string;}[];

  constructor() { }

  ngOnInit() {
    this.acceptedTokens = [];
  }

}
