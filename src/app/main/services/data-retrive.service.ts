import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import {
  doc,
  getDoc,
  onSnapshot
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DataRetriveService {

  constructor(
    private afs: Firestore,
  ) { }


    async getInfoDocument(document_name:string){
      return  await getDoc(doc(this.afs,`app_info/${document_name}`))
    }


}
