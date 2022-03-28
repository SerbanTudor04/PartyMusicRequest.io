import { Component, OnInit } from '@angular/core';
import { FireFunctionsService } from '../shared/fire-functions.service';
import { LoadingBarService } from './services/loading-bar.service';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  subject:string=""
  message:string=""

  constructor(private fnsS:FireFunctionsService,private loadingS:LoadingBarService,private notifS:NotificationsService) { }

  ngOnInit(): void {
  }



  allow_submit_form:boolean=true;

  submit_form(){
    if(this.subject.length==0 || this.message.length==0)
      return
    this.loadingS.turnOn()

    if(!this.allow_submit_form){
      this.notifS.sendWarning("You already submited a contact request, you need to wait in order to submit another.")
      return
    }

    this.allow_submit_form=false

    this.fnsS.call_https("contactUsApi/addContactRequest",{message:this.message,subject:this.subject}).then(
      (res:any)=>{        
        setTimeout(()=>{
          this.allow_submit_form=true
        },6000)
        this.notifS.sendSuccess(`The request with subject ${res.subject} has been made with success!`)
        this.loadingS.turnOff()

      

      }
    )
  }

}
