import { Injectable } from '@angular/core';
import * as functions from '@angular/fire/functions'
import { Functions } from '@angular/fire/functions';
import { AuthenticateService } from '../auth/authenticate.service';


@Injectable({
  providedIn: 'root'
})
export class FireFunctionsService {

  constructor(private fns:Functions,private authS:AuthenticateService) {
    
   }
   call_https(fnc_url:string,data?:any){

    const fnc=functions.httpsCallable(this.fns,fnc_url,)
    console.log(data);
    
    return fnc({subject:data.subject,message:data.message}).then(
      (result)=>{
        const get_data:any = result.data;
        const sanitizedMessage = get_data.text;
         
      return {message:"",details:"",data:sanitizedMessage}

      }
    ).catch((error) => {
      // Getting the Error details.
      const code = error.code;
      const message = error.message;
      const details = error.errors;
      return {message:message+" "+code,details:details,data:null}
    });
   }



}
