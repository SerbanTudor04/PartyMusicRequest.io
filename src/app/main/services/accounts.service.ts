import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  

  constructor(
    private afs: Firestore,
    private aauth: Auth,
    private router: Router,
    private notif: NotificationsService
  ) { }


    async getAccountSettings(){

      let exists=true;

      const retdoc= await  getDoc(doc(this.afs,`accounts/${this.aauth.currentUser?.uid ?? ""}`)).catch(
        (erorr)=>{
          exists=false;
          console.log(erorr);
          
          if(erorr=="FirebaseError: Missing or insufficient permissions."){
            this.notif.sendWarning("User settings doesn't exists!")
            this.createUserAccountDoc()
          }else{
            this.notif.sendWarning("You are trying to fetch somebody's else settings!")

          }
            
          return erorr;
        }
      )
      
      if(exists){

        // this.notif.sendSuccess("User settings fetched with success!")
        return retdoc.data()
        
      }
      return null;
      

    }
    async createUserAccountDoc(){
      const accounData={
        music_gender: "none",
        country: "none",
        user_uid: this.aauth.currentUser?.uid ?? "none",
        user_profile_pic: this.aauth.currentUser?.photoURL ?? "none",
    
      };
      setDoc(doc(this.afs,`accounts/${this.aauth.currentUser?.uid??""}`),accounData)
    }
  async updateUserAccount(account_data:any){
    updateDoc(doc(this.afs,`accounts/${this.aauth.currentUser?.uid?? ""}`),account_data).then(
      ()=>{
        this.notif.sendSuccess("Account settings updated with success!")

      }
      ).catch(
        (error)=>{
        this.notif.sendWarning("An unexpected error occured while tring to update your account settings!")

        }
      )

  }

}
