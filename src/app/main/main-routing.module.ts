import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { JoinWithLinkComponent } from './join-with-link.component';
import { JoinPartyScreenComponent } from './joinparty-screen.component';
import { MainComponent } from './main.component';
import { PartyViewWithoutCodeComponent } from './party-view-without-code.component';

import { PartyViewComponent } from './party-view.component';

const routes: Routes = [
  { path: '', component: MainComponent,children:[
    {path:"home",component:HomePageComponent},
    {path:"join/:joinCode",component:JoinWithLinkComponent},
    {path:"join",component:JoinPartyScreenComponent},
    {path:"pv/:partyID",component:PartyViewComponent},
    {path:"pv",component:PartyViewWithoutCodeComponent},
    {path:"",redirectTo:"home",pathMatch:"full"}

  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
