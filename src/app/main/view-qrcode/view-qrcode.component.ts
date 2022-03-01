import { Component, Input, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'main-view-qrcode',
  templateUrl: './view-qrcode.component.html',
  styleUrls: ['./view-qrcode.component.scss']
})
export class ViewQRCodeComponent implements OnInit {

  url:string=''
  constructor(private activatR:ActivatedRoute) {
    this.activatR.queryParams.subscribe(params=>{
      this.url=params['url']
      
    })
    

   }
  ngOnInit(): void {
  }

}
