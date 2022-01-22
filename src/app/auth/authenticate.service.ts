

import { User } from '../shared/user';
import { Injectable, NgZone } from '@angular/core';
import { Auth, signInWithPopup,GoogleAuthProvider } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  // auth=getAuth()
  constructor(private auth:Auth,  public router: Router,
    public ngZone: NgZone,){}

  OAuthProvider(provider:any) {
    return signInWithPopup(this.auth,provider)
        .then((res) => {
            this.ngZone.run(() => {
                this.router.navigate(['/']);
            })
        }).catch((error) => {
            // window.alert(error)
            console.error(error);
            
        })
}

// Firebase Google Sign-in
  GoogleAuth() {
      return this.OAuthProvider(new GoogleAuthProvider())
          .then(res => {
              console.log('Successfully logged in!')
          }).catch(error => {
              console.log(error)
          });
  }

}
