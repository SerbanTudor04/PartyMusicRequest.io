import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/auth/authenticate.service';
import { NotificationsService } from '../services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authS:AuthenticateService,private router: Router,private notifS:NotificationsService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    const response=this.authS.isAuthenticated()

    if (!response){
        this.router.navigate(['auth'])
        this.notifS.sendWarning("In order to access this content you need to be logged in!")
    }
    return response
  }
  
}
