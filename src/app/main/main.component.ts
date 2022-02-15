import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ConfigService } from './services/config.service';
import { LoadingBarService } from './services/loading-bar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public loadingS:LoadingBarService,public configS:ConfigService,private menu: MenuController) { }

  ngOnInit(): void {
  }
  openFirst() {
    console.log("Menu opened");
    
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }
}
