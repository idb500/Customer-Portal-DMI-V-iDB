import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {

  userBasicInfo: any;
  bankAccountDetails: any;
  loanDetail: any;
  loanOffer: any;
  lastLogin: any;
  mobileNumber: any;
  selectedId: string;
  SpecificLoanDetail: any;
  isLoading: boolean;
  loanAmount: any;
  convertedLoanAmt: any;
  offerAmount:any;
  convertedOfferAmt:any;
  welcomedata:any;
  loanImage:any;
  loanName: any;


  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router, ) { }

  ngOnInit() {
    // this.mobileNumber = JSON.parse(localStorage.getItem('dmi_phone')) || [];

    this.lastLogin = localStorage.getItem('last_login');

    // get data form localStorage
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.bankAccountDetails = JSON.parse(localStorage.getItem('acount_details')) || [];
    this.loanOffer = JSON.parse(localStorage.getItem('loan_offer')) || [];
    this.offerAmount =  this.loanOffer[0].Offered_Amount__c;
    this.convertedOfferAmt = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.offerAmount);
    this.loanDetail = JSON.parse(localStorage.getItem('loan_details')) || [];
    console.log(this.loanDetail);


  }

  loandetail(loan) {
    this.selectedId = loan.Id;
    this.isLoading = true;
    this
      .data
      .getSpecificLoan(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), this.selectedId).subscribe(
        data => {
          this.SpecificLoanDetail = data
          console.log(this.SpecificLoanDetail);
          localStorage.setItem('specific_loan_detail', JSON.stringify(this.SpecificLoanDetail.data));
          this.router.navigate(['/loanDetail']);
          this.isLoading = false;
        },
        err => { this.SpecificLoanDetail = [] }
      );
      this
      .data
      .getWelcomeLetter(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), this.selectedId).subscribe(
        data => {
          this.welcomedata = data
          localStorage.setItem('welcomeLetter', JSON.stringify(this.welcomedata.data));
        },
        err => { this.welcomedata = [] }
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


