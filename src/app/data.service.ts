import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../app/_models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  baseurl = "https://dmi.vistaconnect.com/los/api/"

  getAuth() {
    return this.http.get(this.baseurl + 'getauth')
  }

  getUserLogin(phone, password) {
    return this.http.post(this.baseurl + 'login', { phone, password})
  }

  setUserPassword(phone, password) {
    return this.http.post(this.baseurl + 'password', { phone,password})
  }

  getUser(phone) {
    return this.http.get(this.baseurl + 'otp/' + phone)
  }

  verifyOtp(otp) {
    return this.http.get(this.baseurl + 'verifyotp/' + otp)
  }

  getUserInfo(phone,accesstoken,url) {
    return this.http.post(this.baseurl + 'basicinfo',  { phone, accesstoken, url})
  }

  getBankDetail(phone,accesstoken,url) {  
    return this.http.post(this.baseurl + 'bankdetail',  { phone, accesstoken, url})
  }

  getLoanDetail(phone,accesstoken,url) {  
    return this.http.post(this.baseurl + 'totalloan',  { phone, accesstoken, url})
  }
  getLoanOffer(phone,accesstoken,url) {  
    return this.http.post(this.baseurl + 'offer',  { phone, accesstoken, url})
  }
  getSpecificLoan(accesstoken,url,loanid) {  
    return this.http.post(this.baseurl + 'loandetail',  {accesstoken,url,loanid})
  }

  getWelcomeLetter(accesstoken,url,loanid) {  
    return this.http.post(this.baseurl + 'welcomeletter',  {accesstoken,url,loanid})
  }
  getStatement(accesstoken,url,loanid,loanname) {  
    return this.http.post(this.baseurl + 'statement',  {accesstoken,url,loanid,loanname})
  }
  
}

