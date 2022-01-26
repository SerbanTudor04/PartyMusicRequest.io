import { BehaviorSubject } from 'rxjs';
import { PartyService } from './services/party.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-party-view',
  templateUrl: './party-view.component.html',
  styleUrls: ['./party-view.component.scss']
})
export class PartyViewComponent implements OnInit {

  // hasAccess:BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  hasAccess=false;
  party_data:any={}
  join_code:string;
  constructor(private partyS:PartyService,   private route: ActivatedRoute,) { 
    this.join_code = String(this.route.snapshot.paramMap.get('join_code')); 
    

  }

  ngOnInit(): void {
    this.initPage()
  }

  async initPage(){
    this.party_data=await this.partyS.getPartyData(this.join_code)
    this.hasAccess=this.party_data.hasAccess;
  }
}
