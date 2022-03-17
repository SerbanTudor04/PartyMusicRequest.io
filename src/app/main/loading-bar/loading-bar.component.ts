import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '../services/loading-bar.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {

  constructor(public loadingS:LoadingBarService) { }

  ngOnInit(): void {
  }

}
