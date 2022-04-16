import { FireFunctionsService } from 'src/app/shared/fire-functions.service';
import { AccountsService } from './services/accounts.service';
import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from './services/loading-bar.service';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-setttings-page',
  templateUrl: './setttings-page.component.html',
  styleUrls: ['./setttings-page.component.scss'],
})
export class SetttingsPageComponent implements OnInit {
  account_settings: any = null;

  constructor(
    private accS: AccountsService,
    private loadingS: LoadingBarService,
    private spotifS: SpotifyService,
  ) {}

  music_genders: any[] = [
    { title: 'Rock', code: 'rock' },
    { title: 'Metal', code: 'metal' },
    { title: 'Pop', code: 'pop' },
  ];

  music_gender: any = {};

  country: string = '';

  has_already_submited: boolean = false;

  isSpotifyLoggedIn: boolean = false;

  ngOnInit(): void {
    this.initPage();
  }

  async initPage() {
    this.loadingS.turnOn();
    this.account_settings = await this.accS.getAccountSettings();
    this.isSpotifyLoggedIn =
      this.account_settings.spotifyID != null &&
      this.account_settings.spotifyID != '';

    // select the music gender
    for (let i of this.music_genders)
      if (i.code == this.account_settings.music_gender) this.music_gender = i;
    this.country =
      this.account_settings.country === 'none'
        ? ''
        : this.account_settings.country;

    this.loadingS.turnOff();
  }

  update_profile() {
    if (this.country.length == 0 || !this.music_gender) return;

    this.loadingS.turnOn();
    this.has_already_submited = true;
    this.account_settings.music_gender = this.music_gender.code;
    this.account_settings.country = this.country;
    this.accS
      .updateUserAccount(this.account_settings)
      .then(() => {
        this.loadingS.turnOff();
        setTimeout(() => {
          this.has_already_submited = false;
        }, 6000);
      })
      .catch(() => {
        this.loadingS.turnOff();
      });
  }

  makeSpotifyLogin() {
    this.spotifS.makeSpotifyLogin();
  }
}
