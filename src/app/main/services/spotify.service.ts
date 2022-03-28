import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private afs: Firestore,
    private aauth: Auth,
    // private router: Router,
    private notif: NotificationsService
  ) {
   }

    makeSpotifyLogin(){
      this.notif.sendWarning("Spotify login is not implemented yet!")
    }
}
