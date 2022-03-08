import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page.component';
import { ContactUsComponent } from './contact-us.component';
import { HomePageComponent } from './home-page.component';
import { JoinWithLinkComponent } from './join-with-link.component';
import { JoinPartyScreenComponent } from './joinparty-screen.component';
import { MainComponent } from './main.component';
import { PartyViewWithoutCodeComponent } from './party-view-without-code.component';

import { PartyViewComponent } from './party-view.component';
import { SetttingsPageComponent } from './setttings-page.component';
import { ViewQRCodeComponent } from './view-qrcode/view-qrcode.component';

const routes: Routes = [
  { path: '', component: MainComponent,children:[
    {path:"home",component:HomePageComponent},
    {path:"about",component:AboutPageComponent},
    {path:"contact",component:ContactUsComponent},
    {path:"join/:joinCode",component:JoinWithLinkComponent},
    {path:"join",component:JoinPartyScreenComponent},
    {path:"pv/:partyID",component:PartyViewComponent},
    {path:"pv",component:PartyViewWithoutCodeComponent},
    {path:'view-qr',component:ViewQRCodeComponent},
    {path:'settings',component:SetttingsPageComponent},
    {path:"",redirectTo:"home",pathMatch:"full"}

  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
