import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { collection } from '@angular/fire/firestore';
import { PartyModel } from './../../shared/party';
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
      });

      setDoc(q_doc, data);
      this.notif.sendSuccess(`Welcome to ${data.name} `);
    } else this.notif.sendWarning('You are already in this party!');

    this.router.navigate(['pv', data.join_code]);
  }

  createParty(name: string, description: string, end_date: string) {
    const coll = collection(this.afs, 'partys');

    const data: PartyModel = {
      name: name,
      description: description,
      end_date: String(end_date),
      join_code: this.generateJoinCode(),
      created_by: this.aauth.currentUser?.uid ?? '',
      created_on: this.getCurrentDateTime(),
      members: [
        {
          uid: this.aauth.currentUser?.uid ?? '',
          joined_on: this.getCurrentDateTime(),
        },
      ],
    };

    addDoc(coll, data).then(res=>{

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

