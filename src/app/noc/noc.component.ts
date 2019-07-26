import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noc',
  templateUrl: './noc.component.html',
  styleUrls: ['./noc.component.scss']
})
export class NocComponent implements OnInit {
  userBasicInfo:any;
  welcomeLetter:any;
  welcomedoc : any;
  welcomeLetterPdf: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer,
    private router: Router,) { }

  ngOnInit() {
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.welcomeLetter = JSON.parse(localStorage.getItem('welcomeLetter')) || [];
    this.welcomedoc = this.welcomeLetter.records[0].Welcome_Letter_Url__c;
    this.welcomeLetterPdf= this.sanitizer.bypassSecurityTrustResourceUrl(this.welcomedoc);
  }
}
