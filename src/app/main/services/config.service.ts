import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  application_name="Party Music Request"
  is_dark:boolean=false;
  constructor() { 

  }
  change_mode(){
    this.is_dark=!this.is_dark
  }
}
