import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-loan-statement',
  templateUrl: './loan-statement.component.html',
  styleUrls: ['./loan-statement.component.scss']
})
export class LoanStatementComponent implements OnInit {
  loanStatement:any;
  userBasicInfo:any;

  constructor(private router: Router,
    private data: DataService,) { }

  ngOnInit() {

    // get data from localStorage
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
      this.loanStatement = JSON.parse(localStorage.getItem('statementData')) || [];
      console.log(this.loanStatement);

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

}
