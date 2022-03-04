import { Component, OnInit } from '@angular/core';
import { PartyService } from './services/party.service';
import { format, parseISO } from 'date-fns';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { LoadingBarService } from './services/loading-bar.service';
import { Auth } from '@angular/fire/auth';
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
  selector: 'app-joinparty-screen',
  templateUrl: './joinparty-screen.component.html',
  styleUrls: ['./joinparty-screen.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  
})
export class JoinPartyScreenComponent implements OnInit {

  join_party:boolean=false;
  create_party:boolean=false;
  

  party_code:string="";

  create_party_data={
    name:"",
    end_date:"",
    description:""
  }


  current_joined_partys:any[]=[]

  has_found_partys:boolean=true

  constructor(private partyS:PartyService,private loadingS:LoadingBarService,public auth:Auth) { }

  ngOnInit(): void {
    this.initPage()
  }

  async initPage(){
    
    this.current_joined_partys= await this.partyS.getCurrentJoinedPartys()
    
    
    if(this.current_joined_partys.length==0){
      this.has_found_partys=false
    }




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

  formatDate(value: any) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
}
