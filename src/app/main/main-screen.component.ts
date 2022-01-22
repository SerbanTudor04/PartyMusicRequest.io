import { Component, OnInit } from '@angular/core';
import { PartyService } from './services/party.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  join_party:boolean=false;
  create_party:boolean=false;
  loading_bar:boolean=false;

  party_code:string="";

  create_party_data={
    name:"",
    end_date:"",
    description:""
  }

  constructor(private partyS:PartyService) { }

  ngOnInit(): void {
  }

  joinParty(){
    if(this.party_code.length==0)return;

    this.loading_bar=!this.loading_bar
    this.partyS.makeJoinParty()
    this.loading_bar=!this.loading_bar


  }

}
