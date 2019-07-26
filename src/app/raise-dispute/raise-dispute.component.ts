import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raise-dispute',
  templateUrl: './raise-dispute.component.html',
  styleUrls: ['./raise-dispute.component.scss']
})
export class RaiseDisputeComponent implements OnInit {
  userBasicInfo:any;

  constructor() { }

  ngOnInit() {
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
  }

}
