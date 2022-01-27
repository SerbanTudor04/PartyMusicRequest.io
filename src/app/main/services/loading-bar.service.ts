import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {
  // isLoading : BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  isLoading : boolean=false

  constructor() { }

  turnOn(){
    this.isLoading=true;
  }
  turnOff(){
    this.isLoading=false;
  }
}
