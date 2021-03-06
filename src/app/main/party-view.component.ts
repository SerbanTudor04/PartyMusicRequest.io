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
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { doc, onSnapshot } from 'firebase/firestore';


@Component({
  selector: 'app-party-view',
  templateUrl: './party-view.component.html',
  styleUrls: ['./party-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class PartyViewComponent implements OnInit {
  hasAccess = false;
  party_data: any = {
    songs: [],
  };
  partyid_code: string;

  expandedElement: SongsModel | null = null;

  songs_edited: any[] = [];
  song_modifications: boolean = false;

  last_search: string = '';

  view_mode: string = 'a';

  add_song: boolean = false;
  song_request_exists: boolean = false;


  song_link: string = '';

  edit_poarty: boolean = false;
  is_owner: boolean = false;

  has_spotify_account:boolean = true;
  isSpotifyTokenValid:boolean = true;


  can_update_info: boolean = true;

  is_allowed_refresh: boolean = true;

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
    'songName',
    'songArtist',
    'addedByDisplayName',
    'addedOn',
    'played',
    
  ];
  dataSource = new MatTableDataSource();
  constructor(
    private partyS: PartyService,
    private route: ActivatedRoute,
    private loadingS: LoadingBarService,
    public notifS: NotificationsService,
    private aauth: Auth
  ) {
    this.partyid_code = String(this.route.snapshot.paramMap.get('partyID'));
  }

  ngOnInit(): void {
    this.initPage();
  }


  async initPage() {
    this.loadingS.turnOn();
    this.party_data = await this.partyS.getPartyData(this.partyid_code);

    this.dataSource = new MatTableDataSource(this.party_data.data.songs);

    this.hasAccess = this.party_data.hasAccess;
    if (this.party_data.data.created_by == this.aauth.currentUser?.uid)
      this.is_owner = true;
    if (this.hasAccess) {
      onSnapshot(doc(this.partyS.afs, `partys/${this.partyid_code}`), (doc) => {
        const new_data: any = doc.data();
        // console.log(new_data);
        this.dataSource = new MatTableDataSource(new_data.songs);
      });
    }
    await this.getLastSearch();

    await this.checkIfSpotifyIsConfigured()
    if(this.has_spotify_account)
      await this.validateSpotifyAccessToken();

    this.loadingS.turnOff();
  }

  addSong() {
    if (this.song_request_exists){
      this.notifS.sendWarning('You are already adding a song! Wait 10 seconds in order to add another one.');
      return;
    };

    if(!this.has_spotify_account){
      this.notifS.sendWarning("You need to have a spotify account associated with the PMR account in order to add a song.")
      return;
    }


    if (!this.song_link) {
      this.notifS.sendWarning('You need to enter a link!');
      return;
    }
    this.song_request_exists = true;
    setTimeout(() => {
      this.song_request_exists = false;
    }, 10000);
    this.loadingS.turnOn();
    
    this.partyS
      .addSong(this.partyid_code, this.song_link)
      .then(() => {

        this.song_link = '';
        this.loadingS.turnOff();
      })

  }

  updatePartyInfo() {
    if (
      !this.party_data.data.name ||
      !this.party_data.data.description ||
      !this.can_update_info
    )
      return;
    this.can_update_info = false;

    this.partyS
      .updatePartyInfo(
        this.partyid_code,
        this.party_data.data.name,
        this.party_data.data.description,
        this.party_data.data.open
      )
      .then(() => {
        setTimeout(() => {
          this.can_update_info = true;
        }, 10000);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          this.can_update_info = true;
        }, 10000);
      });
  }

  markASongAsPlayed(element: any) {
    if (this.songs_edited.indexOf(element) == -1)
      this.songs_edited.push(element);
  }

  saveSongsPlayed() {
    if (this.songs_edited.length <= 0) return;

    for (let i in this.songs_edited) {
      let el = this.songs_edited[i];

      // console.log(el);
      

      let index_of = this.party_data.data.songs.findIndex(
        (x: any) =>
          x.songName === el.songName  && x.addedBy === el.addedBy
      );

      // console.log(this.party_data.data.songs)
      // console.log(index_of);
      
      if (index_of != -1) {
        this.party_data.data.songs[index_of].played = true;
      } else {
        this.notifS.sendWarning(
          'Something went wrong, please refresh the page!'
        );
        return;
      }
    }
    // reset list of selected songs
    this.songs_edited = [];

    // update the party
    this.loadingS.turnOn();
    this.partyS
      .updateSongs(this.partyid_code, this.party_data.data.songs)
      .finally(() => {
        this.loadingS.turnOff();
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    localStorage.setItem(`pmr_pv_search__${this.partyid_code}`, filterValue);

    this.applyFilterOnTable(filterValue);
  }

  applyFilterOnTable(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectVIewMode() {
    if (this.view_mode == 'a') {
      this.applyFilterOnTable('');
      return;
    }

    let mode = false;
    if (this.view_mode == 'y') mode = true;
    this.applyFilterOnTable(String(mode));
  }

  get_share_link(join_code: string) {
    return `${window.location.protocol}//${window.location.hostname}/join/${join_code}`;
  }

  copy2Clipboard(data: string) {
    const listener = (e: ClipboardEvent) => {
      e.clipboardData!.setData('text/plain', data);
      e.preventDefault();
      document.removeEventListener('copy', listener);
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
  }

  async getLastSearch() {
    this.last_search =
      localStorage.getItem(`pmr_pv_search__${this.partyid_code}`) ?? '';
  }

  async checkIfSpotifyIsConfigured(){
    await this.partyS.getUserAccount().then(async (accounts) => {
        const data:any=accounts.data()
        if(!data.spotifyID){
          this.has_spotify_account=false
        }
    }
    );
  }

  async validateSpotifyAccessToken(){
    await this.partyS.validateSpotifyToken().then(() => {
      // this.notifS.sendSuccess('Spotify token has been validated!');
    }).catch((err) => {
      // this.notifS.sendDanger('Error while validating the Spotify token!');
      this.isSpotifyTokenValid=false

    });
  }
  showUserProfile(userID: string){
    this.notifS.sendWarning('This feature is not available yet!');
    // this.router.navigate(['/user-profile', userID]);
  }
  async refreshToken() {
    this.loadingS.turnOn();
    await this.partyS.callRefreshToken().then(() => {
      this.notifS.sendSuccess('Token refreshed!');
    }).catch(() => {
      this.notifS.sendDanger('Error refreshing token! Please consider contacting the support.');
      this.has_spotify_account=false;
    }).finally(() => {
      this.isSpotifyTokenValid=true
      this.loadingS.turnOff();
    });
    this.loadingS.turnOff();
  }
}


