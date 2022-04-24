import { Router } from '@angular/router';
import { NotificationsService } from './../services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { FireFunctionsService } from 'src/app/shared/fire-functions.service';
import { LoadingBarService } from '../services/loading-bar.service';

@Component({
  selector: 'app-refresh-spotify-token',
  templateUrl: './refresh-spotify-token.component.html',
  styleUrls: ['./refresh-spotify-token.component.scss'],
})
export class RefreshSpotifyTokenComponent implements OnInit {
  constructor(
    private fns: FireFunctionsService,
    private notifS: NotificationsService,
    private loadingS: LoadingBarService,
    private router:Router
  ) {}

  ngOnInit(): void {}
  async refreshToken() {
    this.loadingS.turnOn();
    await this.fns.call_https('refreshSpotifyToken', {}).then(() => {
      this.notifS.sendSuccess('Token refreshed!');
      window.location.replace(window.location.pathname + window.location.search + window.location.hash);
    
    }).catch(() => {
      this.notifS.sendDanger('Error refreshing token!');
      this.router.navigate(['/']);

    });
    this.loadingS.turnOff();
  }
}
