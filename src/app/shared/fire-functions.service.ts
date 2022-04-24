import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as functions from '@angular/fire/functions'
import { Functions } from '@angular/fire/functions';
import { AuthenticateService } from '../auth/authenticate.service';


@Injectable({
  providedIn: 'root'
})
export class FireFunctionsService {

  api_url="https://us-central1-partymusicrequest.cloudfunctions.net/";

  constructor(private fns:Functions,private httpS:HttpClient) {
    this.handleApiUrl()
    
   }
   call_https(fnc_url:string,data?:any){

    const fnc=functions.httpsCallable(this.fns,fnc_url,{timeout:10000});
    
    return fnc(data).then(
      (result:any)=>{

      return result

      }
    );
   }

   private handleApiUrl(){
     
     if(window.location.hostname=='localhost'){
       this.api_url="http://localhost:5001/partymusicrequest/us-central1/";
      }
   }
}
