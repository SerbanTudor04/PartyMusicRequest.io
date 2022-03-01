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

import {MatPaginatorModule} from '@angular/material/paginator'; 
import { IonicModule } from '@ionic/angular';
import { OpenSideNavComponent } from './open-side-nav/open-side-nav.component';
import { HomePageComponent } from './home-page.component';
import { PartyViewWithoutCodeComponent } from './party-view-without-code.component';
import { JoinWithLinkComponent } from './join-with-link.component';
import { AboutPageComponent } from './about-page.component';

import {MatSortModule} from '@angular/material/sort'; 
@NgModule({
  declarations: [MainComponent, JoinPartyScreenComponent, PartyViewComponent, OpenSideNavComponent, HomePageComponent, PartyViewWithoutCodeComponent, JoinWithLinkComponent, AboutPageComponent],
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
    MatSortModule
  ],
  providers: [],
})
export class MainModule {}
