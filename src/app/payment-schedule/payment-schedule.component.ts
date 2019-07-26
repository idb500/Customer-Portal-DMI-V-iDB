import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.scss']
})
export class PaymentScheduleComponent implements OnInit {
  userBasicInfo:any;

  constructor() { }

  ngOnInit() {
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
  }

}
