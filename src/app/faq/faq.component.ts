import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  userBasicInfo:any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

}
