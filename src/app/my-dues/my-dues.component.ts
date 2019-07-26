import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-dues',
  templateUrl: './my-dues.component.html',
  styleUrls: ['./my-dues.component.scss']
})
export class MyDuesComponent implements OnInit {
  userBasicInfo:any;

  constructor() { }

  ngOnInit() {
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
  }

}
