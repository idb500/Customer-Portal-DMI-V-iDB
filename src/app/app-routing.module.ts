import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { AuthGuard } from './_guards';
import { LoanOfferComponent } from './loan-offer/loan-offer.component';
import { FaqComponent } from './faq/faq.component';
import { WelcomeletterComponent } from './welcomeletter/welcomeletter.component';
import { LoanStatementComponent } from './loan-statement/loan-statement.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { PaymentScheduleComponent } from './payment-schedule/payment-schedule.component';
import { MyDuesComponent } from './my-dues/my-dues.component';
import { NocComponent } from './noc/noc.component';
import { NewLoanAppComponent } from './new-loan-app/new-loan-app.component';
import { RaiseDisputeComponent } from './raise-dispute/raise-dispute.component';


const routes: Routes = [
  { path: '', component: CustomerLoginComponent},
  { path: 'dashboard', component: CustomerDashboardComponent},
  { path: 'loanDetail', component: LoanDetailComponent},
  { path: 'loanOffer', component: LoanOfferComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'welcomeletter', component: WelcomeletterComponent},
  { path: 'loanstatement', component: LoanStatementComponent},
  { path: 'customerSupport', component: CustomerSupportComponent},
  { path: 'paymentSchedule', component: PaymentScheduleComponent},
  { path: 'myDues', component: MyDuesComponent},
  { path: 'noc', component: NocComponent},
  { path: 'newloanapplication', component: NewLoanAppComponent},
  { path: 'raiseAdispute', component: RaiseDisputeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// export const routing = RouterModule.forRoot(routes);
// , canActivate: [AuthGuard]
