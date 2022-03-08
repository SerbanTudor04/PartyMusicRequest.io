import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setttings-page',
  templateUrl: './setttings-page.component.html',
  styleUrls: ['./setttings-page.component.scss']
})
export class SetttingsPageComponent implements OnInit {

  constructor() { }

  music_genders:any[]=[
    {title:"Rock",code:"rock"},
    {title:"Metal",code:"metal"},
    {title:"Pop",code:"pop"},
  ]

  music_gender:any={};


  ngOnInit(): void {
  }


  update_profile(){
    console.log(this.music_gender);
    
  }


}
