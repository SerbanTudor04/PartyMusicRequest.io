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

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  user$ = new BehaviorSubject(this.auth.currentUser);
  user_observer = authState(this.auth);
  constructor(
    public router: Router,
    private auth: Auth,
    public ngZone: NgZone
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
        console.log('Successfully logged in!');
    

        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
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
