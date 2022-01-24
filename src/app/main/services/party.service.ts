import { Auth } from '@angular/fire/auth';
import { doc, collection } from '@angular/fire/firestore';
import { PartyModel } from './../../shared/party';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  constructor(private afs: Firestore,private aauth:Auth) {}

  makeJoinParty() {}

  createParty(name: string, description: string, end_date: string) {
    const coll = collection(this.afs, 'partys');

    const data: PartyModel = {
      name: name,
      description: description,
      end_date: end_date,
      join_code: this.generateJoinCode(),
      created_by:this.aauth.currentUser?.uid ?? ""
    };

    addDoc(coll, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
}
