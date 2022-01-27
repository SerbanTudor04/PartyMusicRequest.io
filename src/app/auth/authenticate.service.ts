

import { Injectable, NgZone } from '@angular/core';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  Auth,


} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotificationsService } from '../main/services/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  user$ = new BehaviorSubject(this.auth.currentUser);
  // user_observer = authState(this.auth);
  constructor(
    public router: Router,
    private auth: Auth,
    public ngZone: NgZone,
    private notifS:NotificationsService
  ) {
    this.auth.onAuthStateChanged((user)=>{
      if(!user){
        this.router.navigate(['auth'])

        return
      }
      console.log(this.user$.value);
      
      this.user$.next(user);
      
    })
  }

  OAuthProvider(provider: any) {
    return signInWithPopup(this.auth, provider)
      .then((res) => {
        return res;
      })
      .catch((error) => {
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
    
    // // if (this.user$.value || this.auth.currentUser) return true;
    // // return false;
    return true
  }

  logout() {
    return signOut(this.auth);
  }
}
