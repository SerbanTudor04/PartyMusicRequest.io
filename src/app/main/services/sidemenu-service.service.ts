import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SidemenuService {

  constructor(private menu: MenuController) { }
  openFirst() {
    
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }


}
