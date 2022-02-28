import { LoadingBarService } from './services/loading-bar.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DocumentSnapshot } from 'firebase/firestore';
import { DataRetriveService } from './services/data-retrive.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements AfterViewInit {

  data:any[]=[];

  constructor(private drs:DataRetriveService,private loadingS:LoadingBarService) { }

  

  ngAfterViewInit(): void {
    this.initPage()
      
  }
  async initPage(){
    this.loadingS.turnOn()
    this.drs.getInfoDocument('about').then(
      (retVal:any)=>{
        this.loadingS.turnOff()
    
        const local_data=retVal.data()
        
        for(let index in local_data){
          this.data.push(local_data[index])
        }
      }
    ).catch(
      (error)=>{
        console.error(error);
        this.loadingS.turnOff()
        
      }
    )
  }
  getType(item:any){
    return typeof(item)
  }
}
