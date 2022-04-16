import { LoadingBarService } from './../../main/services/loading-bar.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/main/services/notifications.service';
import { FireFunctionsService } from 'src/app/shared/fire-functions.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  app_callback: string = '';
  callback_params: any = {};
  notRedirected=false;
  constructor(
    private loadingS: LoadingBarService,
    private route: ActivatedRoute,
    private notifS: NotificationsService,
    private fireFunctionsS: FireFunctionsService,
    private authS: Auth,
    private routerS: Router,
  ) {
    this.app_callback = String(this.route.snapshot.paramMap.get('app'));
    this.route.queryParams.subscribe((params: any) => {
      this.callback_params = params;
    });
  }

  ngOnInit(): void {
    this.initPage();
  }
  async initPage() {
    this.loadingS.turnOn();
    if (this.app_callback == 'spotify') {
      await this.handleCallbackSpotify();
    } else {
      this.notifS.sendWarning('Unknown callback app');
    }
    this.loadingS.turnOff();
    // this.router.navigate(['/'])
    setTimeout(() => {
      this.notRedirected=true;
    }, 10000);
  }

  async handleCallbackSpotify() {
    // this.callback_params.userID=this.authS.currentUser?.uid
    let newParams = {
      userUID: this.authS.currentUser?.uid,
      ...this.callback_params,
    };

    this.fireFunctionsS.call_https('validateSpotifyToken', newParams).then(
      (data: any) => {
        console.log(data);
      
        if(data.data){
          const token=data.data.token;
          localStorage.setItem('pmrSpotifyToken',token);
        }
        this.routerS.navigate(['/settings']);
      }
    ).catch((err)=>{
      console.log(err);
      this.notifS.sendDanger("An error occured while trying to validate your spotify token")
      this.loadingS.turnOff()
      this.notRedirected=true;
      this.routerS.navigate(['/']);

    })

  }
}
