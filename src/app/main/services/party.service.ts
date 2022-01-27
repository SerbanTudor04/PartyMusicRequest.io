import { Router } from '@angular/router';
import { Auth, getAdditionalUserInfo, getAuth } from '@angular/fire/auth';
import { collection } from '@angular/fire/firestore';
import { PartyModel, SongsModel } from './../../shared/party';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, where, query, getDocs, doc, setDoc } from 'firebase/firestore';


import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  constructor(
    private afs: Firestore,
    private aauth: Auth,
    private router: Router,
    private notif: NotificationsService
  ) {}

  async makeJoinParty(join_code: string) {
    const q_data: any = await this.getDocumentByPartyCode(join_code);

    if (q_data.empty) {
      this.notif.sendDanger('The entered code is invalid!');
      return;
    }

    // get the desired document
    let docID = q_data.docs[0].id;
    let data: any = q_data.docs[0].data();

    let q_doc = doc(this.afs, `partys/${docID}`);

    let isInParty = this.checkIfUserIsInParty(data)

    if (!isInParty) {
      data.members.push({
        uid: String(this.aauth.currentUser?.uid),
        joined_on: String(this.getCurrentDateTime()),
        displayName: String(this.aauth.currentUser?.displayName),
      });

      await setDoc(q_doc, data);
      this.notif.sendSuccess(`Welcome to ${data.name}, ${this.aauth.currentUser?.displayName}!`);
    } else this.notif.sendSuccess(`Welcome back, ${this.aauth.currentUser?.displayName}!`);

    this.router.navigate(['pv', data.join_code]);
  }

  async createParty(name: string, description: string, end_date: string) {
    const coll = collection(this.afs, 'partys');

    const data: PartyModel = {
      name: name,
      description: description,
      end_date: String(end_date),
      join_code: this.generateJoinCode(),
      created_by: this.aauth.currentUser?.uid ?? '',
      created_on: this.getCurrentDateTime(),
      created_by_displayName:this.aauth.currentUser?.displayName ?? "",
      members: [
        {
          uid: this.aauth.currentUser?.uid ?? '',
          joined_on: this.getCurrentDateTime(),
          displayName:this.aauth.currentUser?.displayName ?? ""
        },
      ],
    };

    await addDoc(coll, data).then(res=>{

      this.router.navigate(['pv',data.join_code])
      
    }).catch((error) => {
      console.log(error);
    });



  }

  async getPartyData(join_code: string) {
    const q_data= await this.getDocumentByPartyCode(join_code);
    
    if (q_data.empty ) {
      this.notif.sendDanger('The entered code is invalid!');

      return {hasAccess:false};
    }

    let data= q_data.docs[0].data()
    let retVal={
      hasAccess:this.checkIfUserIsInParty(data),
      data:{},
      doc_uid:"",
    }
    

    if (!retVal.hasAccess) {
      return retVal;
    }
  
    retVal.data=data
    
    retVal.doc_uid=q_data.docs[0].id

    return retVal
  }

  async addSong(join_code:string,song_name:string,song_author:string){
    const q_data= await this.getDocumentByPartyCode(join_code);
    let docID = q_data.docs[0].id;
    let data: any = q_data.docs[0].data();

    let q_doc = doc(this.afs, `partys/${docID}`);


    const song_info:any={
      added_by_displayName:this.aauth.currentUser?.displayName ?? "",
      added_on:this.getCurrentDateTime(),
      played:false,
      song_author:song_author,
      song_name:song_name
    }


    data.songs.push(song_info);

    await setDoc(q_doc, data).then(
      ()=>{
        this.notif.sendSuccess(`Song ${song_name},by ${song_author}, was added with success!`);
        song_info.is_ok=true;
      }
    ).catch(
      (error)=>{
        console.log(error);
        song_info.is_ok=false;
        
        this.notif.sendDanger(`An unexpected error has occured while trying to add song ${song_name},by ${song_author}!`);

      }
    );
    return song_info


  }


  // aux functions

  private getCurrentDateTime(): string {
    let dateTime = new Date();
    return dateTime.toUTCString();
  }

  private generateJoinCode(length: number = 8): string {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private async getDocumentByPartyCode(join_code: string) {
    // make a query for the desired party
    const coll = collection(this.afs, 'partys');
    const q = query(coll, where('join_code', '==', join_code));
    const q_data = await getDocs(q);

    return q_data;
  }
  private checkIfUserIsInParty(data:any):boolean{
    let isInParty = false;
    for (let i in data.members) {
      if (data.members[i].uid == this.aauth.currentUser?.uid) {
        isInParty = true;
      }
    }
    return isInParty
  }

}

