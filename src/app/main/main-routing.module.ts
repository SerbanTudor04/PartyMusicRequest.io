import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './main-screen.component';
import { MainComponent } from './main.component';
import { PartyViewCreatorComponent } from './party-view-creator.component';
import { PartyViewComponent } from './party-view.component';

const routes: Routes = [
  { path: '', component: MainComponent,children:[
    {path:"",component:MainScreenComponent},
    {path:"pv/:partyID",component:PartyViewComponent},
    {path:"pvc/:partyID",component:PartyViewCreatorComponent},

  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
