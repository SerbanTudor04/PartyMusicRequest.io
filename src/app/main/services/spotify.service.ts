
import { Injectable } from '@angular/core';
import { FireFunctionsService } from 'src/app/shared/fire-functions.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private fireFunctionsS: FireFunctionsService,
    private notifS: NotificationsService

  ) {
   }

    makeSpotifyLogin(){
      // this.notif.sendWarning("Spotify login is not implemented yet!")
      this.fireFunctionsS.call_https('getRedirectAuthSpotify',{}).then(
        (data:any) => {
          
          
          if(data.data.redirectURL){
          
            document.cookie="state="+data.data.state;
            window.location.href=data.data.redirectURL
            
          }else{
            this.notifS.sendWarning("Error: "+data.error)
          }
          
        }
      )
    }
}
