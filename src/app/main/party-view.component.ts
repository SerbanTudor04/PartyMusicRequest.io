import { PartyService } from './services/party.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from './services/loading-bar.service';
import { NotificationsService } from './services/notifications.service';
import { Auth } from '@angular/fire/auth';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SongsModel } from '../shared/party';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-party-view',
  templateUrl: './party-view.component.html',
  styleUrls: ['./party-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PartyViewComponent implements OnInit {
  hasAccess = false;
  party_data: any = {
    songs: [],
  };
  partyid_code: string;

  expandedElement:SongsModel|null=null;

  songs_edited:any[]=[]
  song_modifications:boolean=false;



  add_song: boolean = false;
  edit_poarty: boolean = false;
  is_owner: boolean = false;

  can_update_info: boolean = true;

  song_add_data = {
    song_name: '',
    song_author: '',
  };

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  displayedColumns = [
    'song_name',
    'song_author',
    'added_by_displayName',
    'added_on',
    'played',
  ];
  dataSource = new MatTableDataSource();
  constructor(
    private partyS: PartyService,
    private route: ActivatedRoute,
    private loadingS: LoadingBarService,
    public notifS: NotificationsService,
    private aauth: Auth,
  ) {
    this.partyid_code = String(this.route.snapshot.paramMap.get('partyID'));
  }

  ngOnInit(): void {
    this.initPage();
  }

  async initPage() {
    this.party_data = await this.partyS.getPartyData(this.partyid_code);

    this.dataSource = new MatTableDataSource(this.party_data.data.songs);

    this.hasAccess = this.party_data.hasAccess;
    if (this.party_data.data.created_by == this.aauth.currentUser?.uid)
      this.is_owner = true;
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

  updatePartyInfo() {
    if (!this.party_data.data.name || !this.party_data.data.description || !this.can_update_info)
      return;
    this.can_update_info = false;

    this.partyS.updatePartyInfo(
      this.partyid_code,
      this.party_data.data.name,
      this.party_data.data.description,
      this.party_data.data.open
    ).then(
      () => {
        setTimeout(() => {
          this.can_update_info = true;
        }, 10000)
      }
    ).catch(
      (error) => {
        console.log(error);
        setTimeout(() => {
          this.can_update_info = true;
        }, 10000)
      }
    )



  }


  markASongAsPlayed(element:any){  
    if(this.songs_edited.indexOf(element)==-1)
      this.songs_edited.push(element)

  }



  saveSongsPlayed(){
    if(this.songs_edited.length<=0)
      return;

    for(let i in this.songs_edited){
      
      let el=this.songs_edited[i]
      let index_of=this.party_data.data.songs.indexOf(el)
      el.played=true;
      this.party_data.data.songs[index_of]=el
      
    }
    this.songs_edited=[]

    this.partyS.updateSongs(this.partyid_code,this.party_data.data.songs);
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
