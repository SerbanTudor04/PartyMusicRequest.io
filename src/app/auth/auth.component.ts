import { AuthenticateService } from './authenticate.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public auth: AuthenticateService,private activatR:ActivatedRoute) { 
    this.activatR.queryParams.subscribe(params=>{
    if(params['redirect_url']){
        this.auth.redirect_url.next(params['redirect_url'])

    }
        
    })
    if(sessionStorage.getItem('auth_redirect_url') && this.auth.redirect_url.value==null || this.auth.redirect_url.value==''){
      this.auth.redirect_url.next(sessionStorage.getItem('auth_redirect_url')??"/")
      sessionStorage.removeItem('auth_redirect_url')
    }
    console.log(this.auth.redirect_url.value);
    
  }

  ngOnInit(): void {
  }

}
