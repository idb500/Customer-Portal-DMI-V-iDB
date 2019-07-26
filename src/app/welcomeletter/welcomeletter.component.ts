import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcomeletter',
  templateUrl: './welcomeletter.component.html',
  styleUrls: ['./welcomeletter.component.scss']
})
export class WelcomeletterComponent implements OnInit {
  // src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  welcomeLetter:any;
  welcomedoc : any;
  welcomeLetterPdf: SafeResourceUrl;
  userBasicInfo:any;
  
  constructor(public sanitizer: DomSanitizer,
    private router: Router,) { }

  ngOnInit() {
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.welcomeLetter = JSON.parse(localStorage.getItem('welcomeLetter')) || [];
    this.welcomedoc = this.welcomeLetter.records[0].Welcome_Letter_Url__c;
    console.log(this.welcomedoc);
    this.welcomeLetterPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.welcomedoc);
    console.log(this.welcomeLetterPdf);

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

}
