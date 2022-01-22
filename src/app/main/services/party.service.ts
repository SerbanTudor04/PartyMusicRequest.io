import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private fs:Firestore) { }

  makeJoinParty(){
    
  }


}
