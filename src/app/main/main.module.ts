import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatIconModule } from '@angular/material/icon';
import { JoinPartyScreenComponent } from './joinparty-screen.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartyViewComponent } from './party-view.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';
import { IonicModule } from '@ionic/angular';
import { OpenSideNavComponent } from './open-side-nav/open-side-nav.component';
import { HomePageComponent } from './home-page.component';
import { PartyViewWithoutCodeComponent } from './party-view-without-code.component';
import { JoinWithLinkComponent } from './join-with-link.component';
import { AboutPageComponent } from './about-page.component';
import { QRCodeModule } from 'angular2-qrcode';

import { MatSortModule } from '@angular/material/sort';
import { ViewQRCodeComponent } from './view-qrcode/view-qrcode.component';
import { ContactUsComponent } from './contact-us.component';
import { SetttingsPageComponent } from './setttings-page.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { RefreshSpotifyTokenComponent } from './refresh-spotify-token/refresh-spotify-token.component';

@NgModule({
  declarations: [
    MainComponent,
    JoinPartyScreenComponent,
    PartyViewComponent,
    OpenSideNavComponent,
    HomePageComponent,
    PartyViewWithoutCodeComponent,
    JoinWithLinkComponent,
    AboutPageComponent,
    ViewQRCodeComponent,
    ContactUsComponent,
    SetttingsPageComponent,
    LoadingBarComponent,
    RefreshSpotifyTokenComponent,
    
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatIconModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    ClipboardModule,
    IonicModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    QRCodeModule,
  ],
  providers: [],
  exports:[LoadingBarComponent]
})
export class MainModule {}
