
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean;
  isOTP: boolean;
  isPassword: boolean;
  isHavingPassword: boolean;
  notOTP: boolean;
  isMobileField: boolean;
  loginSection: boolean;
  resetPasswordSec: boolean;
  isVerifyOTP: boolean;
  getauthdata: any;
  mobnumPattern = "[789][0-9]{9}";
  user: any;
  mobileNumber: any;
  returnUrl: string;
  phoneNotCurrect: any;
  userBasicInfo: any;
  bankAccountDetails: any;
  loanDetail: any;
  loanOffer: any;
  lastLogin: any;


  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
    private router: ActivatedRoute,
    private route: Router,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.loginSection = true;
    this.notOTP = true;
    this.isMobileField = true;
    this.isVerifyOTP = false;

    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.pattern(this.mobnumPattern)],
      password: [''],
      new_password: [''],
      repeat_password: [''],
      otp: ['']
    });

    // this.authenticationService.logout();
    // this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || '/';


    this
      .data
      .getAuth().subscribe(
        data => {
          this.getauthdata = data
          localStorage.setItem('dmi_token', this.getauthdata.data.access_token)
          localStorage.setItem('dmi_instance_url', this.getauthdata.data.instance_url)
        },
        err => { this.getauthdata = [] }
      );
  }

  get formData() { return this.loginForm.controls; }

  sendOTP() {
    this.data.getUser(this.formData.phone.value)
      .subscribe(
        data => {
          this.user = data
          localStorage.setItem('dmi_phone', this.user.data)
          this
            .data
            .getUserInfo(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url')).subscribe(
              data => {
                this.userBasicInfo = data
                localStorage.setItem('user_basic_info', JSON.stringify(this.userBasicInfo.data))
              },
              err => { this.userBasicInfo = [] }
            );

          this
            .data
            .getBankDetail(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url')).subscribe(
              data => {
                this.bankAccountDetails = data
                localStorage.setItem('acount_details', JSON.stringify(this.bankAccountDetails.data))
              },
              err => { this.bankAccountDetails = [] }
            );

          this
            .data
            .getLoanDetail(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url')).subscribe(
              data => {
                this.loanDetail = data
                localStorage.setItem('loan_details', JSON.stringify(this.loanDetail.data))
              },
              err => { this.loanDetail = [] }
            );

          this
            .data
            .getLoanOffer(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url')).subscribe(
              data => {
                this.loanOffer = data
                localStorage.setItem('loan_offer', JSON.stringify(this.loanOffer.data));
              },
              err => { this.loanOffer = [] }
            );
          this.isMobileField = false;
          this.isOTP = true;
          this.notOTP = false;
          this.isVerifyOTP = true;
          this.isHavingPassword = false;
        },
        err => {
          if (err.status === 404) {

          }
          this.user = []
        }
      );
  }

  verifyOTP() {
    localStorage.setItem('OTP_Pass', this.formData.otp.value);
    this.data.verifyOtp(this.formData.otp.value)
      .subscribe(
        data => {
          this.user = data
          this.loginSection = false;
          this.resetPasswordSec = true;
          this.mobileNumber = localStorage.getItem('dmi_phone');
        },
        err => { this.user = [] }
      );
  }

  goToDashboard() {
    this.route.navigate(['/dashboard']);
  }


  proceedLogin() {
    this.data.setUserPassword(localStorage.getItem('dmi_phone'), this.formData.new_password.value)
      .subscribe(
        data => {
          this.user = data
          this.route.navigate(['/dashboard']);
        },
        err => {
          if (err.status === 404) {
          }
          this.user = []
        }
      );

  }

  otpLogin() {
    this.isOTP = false;
    this.notOTP = true;
    this.isMobileField = true;
    this.isPassword = false;
    this.isHavingPassword = false;
  }

  passwordLogin() {
    this.notOTP = false;
    this.isOTP = false;
    this.isMobileField = true;
    this.isHavingPassword = true;
    this.isPassword = true;
  }

  getLogin() {
    if (this.loginForm.invalid) {
      this.phoneNotCurrect = "Please enter valid phone number";
      return;
    }
    this.isLoading = true;
    localStorage.setItem('dmi_phone', this.formData.phone.value)
    this.data.getUserLogin(this.formData.phone.value, this.formData.password.value)
      // .pipe(first())
      .subscribe(
        data => {
          this.lastLogin = data
          localStorage.setItem('last_login', this.lastLogin.data.last_login);
        },
        error => {
        });

    this
      .data
      .getUserInfo(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url')).subscribe(
        data => {
          this.userBasicInfo = data
          localStorage.setItem('user_basic_info', JSON.stringify(this.userBasicInfo.data))
        },
        err => { this.userBasicInfo = [] }
      );

    this
      .data
      .getBankDetail(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url')).subscribe(
        data => {
          this.bankAccountDetails = data
          localStorage.setItem('acount_details', JSON.stringify(this.bankAccountDetails.data))
        },
        err => { this.bankAccountDetails = [] }
      );

    this
      .data
      .getLoanOffer(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url')).subscribe(
        data => {
          this.loanOffer = data
          localStorage.setItem('loan_offer', JSON.stringify(this.loanOffer.data));
        },
        err => { this.loanOffer = [] }
      );

      this
      .data
      .getLoanDetail(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url')).subscribe(
        data => {
          this.loanDetail = data
          localStorage.setItem('loan_details', JSON.stringify(this.loanDetail.data))
          this.isLoading = false;
          this.route.navigate(['/dashboard']);
        },
        err => { this.loanDetail = [] }
      );
  }

}
