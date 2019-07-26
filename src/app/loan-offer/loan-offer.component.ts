import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-offer',
  templateUrl: './loan-offer.component.html',
  styleUrls: ['./loan-offer.component.scss']
})
export class LoanOfferComponent implements OnInit {
loanOffer:any;
offerAmount:any;
convertedOfferAmt:any;
userBasicInfo:any;

  constructor(private router: Router) { }

  ngOnInit() {

    // get loan offer from localStorage
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.loanOffer = JSON.parse(localStorage.getItem('loan_offer')) || [];
    this.offerAmount =  this.loanOffer[0].Offered_Amount__c;
    this.convertedOfferAmt = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.offerAmount);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

}
