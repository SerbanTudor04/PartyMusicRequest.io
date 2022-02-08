import { Component } from '@angular/core';
import { ConfigService } from './main/services/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pmr';
  constructor(public configS:ConfigService){}
  
}
