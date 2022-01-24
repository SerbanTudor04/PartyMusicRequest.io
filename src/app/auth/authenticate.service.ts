
import { Injectable, NgZone } from '@angular/core';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  authState,
  Auth,
  browserSessionPersistence,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotificationsService } from '../main/services/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  user$ = new BehaviorSubject(this.auth.currentUser);
  user_observer = authState(this.auth);
  constructor(
    public router: Router,
    private auth: Auth,
    public ngZone: NgZone,
    private notifS:NotificationsService
  ) {}

  OAuthProvider(provider: any) {
    return signInWithPopup(this.auth, provider)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        // window.alert(error)
        console.error(error);
        return error;
      });
  }

  // Firebase Google Sign-in
  GoogleAuth() {
    return this.OAuthProvider(new GoogleAuthProvider())
      .then((res) => {
        this.notifS.sendSuccess('Successfully logged in!')
        this.user$.next(res.user)

        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
        this.notifS.sendWarning('An error occured while logging in!')

      });
  }
  isAuthenticated() {
    if (this.user$.value) return true;
    return false;
  }

  logout() {
    return signOut(this.auth);
  }
}
