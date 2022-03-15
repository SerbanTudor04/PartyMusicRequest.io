import { AccountsService } from './../../main/services/accounts.service';
import { FireFunctionsService } from './../../shared/fire-functions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-verifyed',
  templateUrl: './not-verifyed.component.html',
  styleUrls: ['./not-verifyed.component.scss']
})
export class NotVerifyedComponent implements OnInit {

  email_addr:string="";
  submited_form:boolean=false;
  constructor(private fireFNCS:FireFunctionsService) { }





  ngOnInit(): void {
  }

  submit_request(){

  }

}
