import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss']
})
export class CustomerSupportComponent implements OnInit {
  userBasicInfo:any;

  constructor() { }

  ngOnInit() {
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
  }

}
