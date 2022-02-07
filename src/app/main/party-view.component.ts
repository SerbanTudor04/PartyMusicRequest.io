
import { PartyService } from './services/party.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from './services/loading-bar.service';
import { NotificationsService } from './services/notifications.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-party-view',
  templateUrl: './party-view.component.html',
  styleUrls: ['./party-view.component.scss'],
})
export class PartyViewComponent implements OnInit {
  hasAccess = false;
  party_data: any = {
    songs:[]
  };
  partyid_code: string;

  add_song: boolean = false;

  song_add_data = {
    song_name: '',
    song_author: '',
  };

  
  displayedColumns=['song_name','song_author','added_by_displayName','added_on','played']
  dataSource = new MatTableDataSource();
  constructor(
    private partyS: PartyService,
    private route: ActivatedRoute,
    private loadingS: LoadingBarService,
    public notifS:NotificationsService
  ) {
    this.partyid_code = String(this.route.snapshot.paramMap.get('partyID'));
  }

  ngOnInit(): void {
    this.initPage();
  }

  async initPage() {
    this.party_data = await this.partyS.getPartyData(this.partyid_code);

    this.dataSource.data=this.party_data.data.songs;
    this.hasAccess = this.party_data.hasAccess;
  }

  addSong() {
    if (!this.song_add_data.song_author || !this.song_add_data.song_name)
      return;

    this.loadingS.turnOn();
    this.partyS
      .addSong(
        this.partyid_code,
        this.song_add_data.song_name,
        this.song_add_data.song_author
      )
      .then((song: any) => {
        // console.log(song);

        this.loadingS.turnOff();
      })
      .catch((error) => {
        console.log(error);
        this.loadingS.turnOff();
      });
  }


}
