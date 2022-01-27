import { BehaviorSubject } from 'rxjs';
import { PartyService } from './services/party.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from './services/loading-bar.service';

@Component({
  selector: 'app-party-view',
  templateUrl: './party-view.component.html',
  styleUrls: ['./party-view.component.scss'],
})
export class PartyViewComponent implements OnInit {
  hasAccess = false;
  party_data: any = {};
  join_code: string;

  add_song: boolean = false;
  

  song_add_data = {
    song_name: '',
    song_author: '',
  };

  constructor(private partyS: PartyService, private route: ActivatedRoute,private loadingS:LoadingBarService) {
    this.join_code = String(this.route.snapshot.paramMap.get('join_code'));
  }

  ngOnInit(): void {
    this.initPage();
  }

  async initPage() {
    this.party_data = await this.partyS.getPartyData(this.join_code);
    this.hasAccess = this.party_data.hasAccess;
  }

  addSong() {
    if (!this.song_add_data.song_author || !this.song_add_data.song_name)
      return;
    
    this.loadingS.turnOn()
    this.partyS
      .addSong(this.join_code,this.song_add_data.song_name, this.song_add_data.song_author)
      .then((song: any) => {
        console.log(song);

        this.loadingS.turnOff()
      })
      .catch((error) => {
        console.log(error);
        this.loadingS.turnOff()

      });
  }
}
