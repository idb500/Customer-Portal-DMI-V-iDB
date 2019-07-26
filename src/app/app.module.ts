import { BrowserModule } from '@angular/platform-browser';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import {HTTP_INTERCEPTORS,  HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoanOfferComponent } from './loan-offer/loan-offer.component';
import { FooterComponent } from './footer/footer.component';
import { FaqComponent } from './faq/faq.component';
import { WelcomeletterComponent } from './welcomeletter/welcomeletter.component';
import { LoanStatementComponent } from './loan-statement/loan-statement.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { PaymentScheduleComponent } from './payment-schedule/payment-schedule.component';
import { MyDuesComponent } from './my-dues/my-dues.component';
import { NocComponent } from './noc/noc.component';
import { NewLoanAppComponent } from './new-loan-app/new-loan-app.component';
import { RaiseDisputeComponent } from './raise-dispute/raise-dispute.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { inrFormat } from './currencyFormat';


@NgModule({
  declarations: [
    AppComponent,
    CustomerLoginComponent,
    CustomerDashboardComponent,
    MainLayoutComponent,
    LoanDetailComponent,
    LoanOfferComponent,
    FooterComponent,
    FaqComponent,
    WelcomeletterComponent,
    LoanStatementComponent,
    CustomerSupportComponent,
    PaymentScheduleComponent,
    MyDuesComponent,
    NocComponent,
    NewLoanAppComponent,
    RaiseDisputeComponent,
    inrFormat
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
