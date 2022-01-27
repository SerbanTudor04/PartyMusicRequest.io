import { Component, OnInit } from '@angular/core';
import { PartyService } from './services/party.service';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl} from '@angular/forms';
import { LoadingBarService } from './services/loading-bar.service';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  
})
export class MainScreenComponent implements OnInit {

  join_party:boolean=false;
  create_party:boolean=false;
  

  party_code:string="";

  create_party_data={
    name:"",
    end_date:"",
    description:""
  }
  // date = new FormControl(moment());

  constructor(private partyS:PartyService,private loadingS:LoadingBarService) { }

  ngOnInit(): void {
  }

  joinParty(){
    if(this.party_code.length==0)return;

    this.loadingS.turnOn()
    this.partyS.makeJoinParty(this.party_code).then(
      ()=>{
        this.loadingS.turnOff()
      }
    ).catch(
      (error)=>{
        this.loadingS.turnOff()
        console.log(error);
        
      }
    )
    


  }
  createParty(){
    if(!this.create_party_data.name || !this.create_party_data.description || !this.create_party_data.end_date)
      return
    let date_of_end= new Date(this.create_party_data.end_date).toUTCString()
    
    this.loadingS.turnOn()    
    this.partyS.createParty(this.create_party_data.name,this.create_party_data.description,date_of_end).then(
      ()=>{
        this.loadingS.turnOff()
      }
    ).catch(
      (error)=>{
        this.loadingS.turnOff()
        console.log(error);
        
      }
    )
  }

}
