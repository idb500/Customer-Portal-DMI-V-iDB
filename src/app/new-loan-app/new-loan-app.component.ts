import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-loan-app',
  templateUrl: './new-loan-app.component.html',
  styleUrls: ['./new-loan-app.component.scss']
})
export class NewLoanAppComponent implements OnInit {
  userBasicInfo:any;

  constructor() { }

  ngOnInit() {
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
  }
}
