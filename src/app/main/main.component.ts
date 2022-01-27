import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from './services/loading-bar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public loadingS:LoadingBarService) { }

  ngOnInit(): void {
  }

}
