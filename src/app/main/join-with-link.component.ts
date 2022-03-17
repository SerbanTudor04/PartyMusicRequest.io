import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from './services/loading-bar.service';
import { PartyService } from './services/party.service';

@Component({
  selector: 'app-join-with-link',
  templateUrl: './join-with-link.component.html',
  // styleUrls: ['./join-with-link.component.scss']
})
export class JoinWithLinkComponent implements OnInit {
  join_code:string;
  constructor(
    private route: ActivatedRoute,
    private partyS:PartyService,private loadingS:LoadingBarService,
    private router:Router
  ) {
    this.join_code = String(this.route.snapshot.paramMap.get('joinCode'));

   }

  ngOnInit(): void {
    this.joinParty()
  }
  joinParty(){
    
    if(this.join_code.length==0)return;

    this.loadingS.turnOn()
    this.partyS.makeJoinParty(this.join_code).then(
      (retVal:boolean)=>{
        this.loadingS.turnOff()
        if(!retVal)
          this.router.navigate(['join'])

      }
    ).catch(
      (error)=>{
        this.loadingS.turnOff()
        console.log(error);
        
      }
    )
  
  }
}
