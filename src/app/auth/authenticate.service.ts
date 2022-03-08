

import { Injectable, NgZone } from '@angular/core';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  Auth,
  FacebookAuthProvider


} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotificationsService } from '../main/services/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  user$ = new BehaviorSubject(this.auth.currentUser);

  redirect_url= new BehaviorSubject<string>("")
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
        if(res.user){
          this.notifS.sendSuccess('Successfully logged in!')
          this.user$.next(res.user)
          // this.router.navigate(['/']);
          this.afterLogin()

  
        }
        if(res=="FirebaseError: Firebase: Error (auth/account-exists-with-different-credential)."){
          this.notifS.sendWarning('An account was already created using other method! Please consider authenticate via other available method.')
        }
      })
      .catch((error) => {
        console.log(error);
        this.notifS.sendWarning('An unexpected error occured while logging in!')

      });
  }

  FacebookAuth() {
    return this.OAuthProvider(new FacebookAuthProvider())
      .then((res) => {
        if(res.user){
          this.notifS.sendSuccess('Successfully logged in!')
          this.user$.next(res.user)
          // this.router.navigate(['/']);
          this.afterLogin()
        }
        if(res=="FirebaseError: Firebase: Error (auth/account-exists-with-different-credential)."){
          this.notifS.sendWarning('An account was already created using other method! Please consider authenticate via other available method.')
        }
      })
      .catch((error) => {
        console.log(error);
        this.notifS.sendWarning('An unexpected error occured while logging in!')

      });
  }
  logout() {
    return signOut(this.auth);
  }

  afterLogin(){
    if(String(this.redirect_url.value).length>0){
      // this.router.navigateByUrl(this.redirect_url.value)
      window.location.href=this.redirect_url.value
      return
    }
    this.router.navigate(['/'])


  }


}
