import { Component, OnInit } from '@angular/core';
import { FireFunctionsService } from '../shared/fire-functions.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  subject:string=""
  message:string=""

  constructor(private fnsS:FireFunctionsService) { }

  ngOnInit(): void {
  }

  submit_form(){
    if(this.subject.length==0 || this.message.length==0)
      return
    this.fnsS.call_https("api/addContactRequest",{message:this.message,subject:this.subject}).then(
      (res)=>{
        console.log(res);
        
      }
    )
  }

}
