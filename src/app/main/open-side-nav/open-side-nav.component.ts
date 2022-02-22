import { SidemenuService } from './../services/sidemenu-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-side-nav',
  templateUrl: './open-side-nav.component.html',
  styleUrls: ['./open-side-nav.component.scss']
})
export class OpenSideNavComponent implements OnInit {

  constructor(public sdS:SidemenuService) { }

  ngOnInit(): void {
  }

}
