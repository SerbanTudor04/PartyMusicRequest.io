import { Component, OnInit } from '@angular/core';

import { ConfigService } from './services/config.service';
import { LoadingBarService } from './services/loading-bar.service';
import { SidemenuService } from './services/sidemenu-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public loadingS:LoadingBarService,public configS:ConfigService,private sidemenuS:SidemenuService) { }

  ngOnInit(): void {
  }

}
