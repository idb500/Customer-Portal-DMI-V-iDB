import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss']
})
export class LoanDetailComponent implements OnInit {
  userBasicInfo: any;
  loanDetails: any;
  speceficLoanDetail: any;
  loanId:any;
  isLoading:boolean;
  welcomedata:any;
  selectedId:any;
  SpecificLoanDetail:any;
  loanName:any;
  loanStatementData:any;
  specificLoanAmt:any;
  convertedLoanAmt:any;

  constructor(private router: Router,
    private data: DataService,) { }

  ngOnInit() {
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.loanDetails = JSON.parse(localStorage.getItem('loan_details')) || [];
    this.speceficLoanDetail = JSON.parse(localStorage.getItem('specific_loan_detail')) || [];
    console.log(this.speceficLoanDetail);
    this.specificLoanAmt =  this.speceficLoanDetail.records[0].Sanction_Amount__c;
    this.convertedLoanAmt = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.specificLoanAmt);
    this.loanId = this.speceficLoanDetail.records[0].Id;
    this.loanName = this.speceficLoanDetail.records[0].Name;
  }

  welcomeLetter(){
    this.router.navigate(['/welcomeletter']);
  }

  laonStatement(){
    this.isLoading = true;
    this
      .data
      .getStatement(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), this.loanId, this.loanName).subscribe(
        data => {
          this.loanStatementData = data
          localStorage.setItem('statementData', JSON.stringify(this.loanStatementData.data));
          this.isLoading = false;
          this.router.navigate(['/loanstatement']);
        },
        err => { this.loanStatementData = [] }
      );
  }

  selectValue(loan) {
    this.selectedId = loan.Id;
    this.isLoading = true;
    this
      .data
      .getSpecificLoan(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), this.selectedId).subscribe(
        data => {
          this.SpecificLoanDetail = data
          localStorage.setItem('specific_loan_detail', JSON.stringify(this.SpecificLoanDetail.data));
          this.router.navigate(['/loanDetail']);
          this.isLoading = false;
          if (this.router.url === '/loanDetail') {
            this.isLoading = true;
            window.location.reload();
            this.isLoading = false;
          }
        },
        err => { this.SpecificLoanDetail = [] }
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

}
