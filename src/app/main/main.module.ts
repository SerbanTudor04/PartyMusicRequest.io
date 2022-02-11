import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatIconModule } from '@angular/material/icon';
import { MainScreenComponent } from './main-screen.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartyViewComponent } from './party-view.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { MatTableModule } from '@angular/material/table';

import {MatPaginatorModule} from '@angular/material/paginator'; 
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [MainComponent, MainScreenComponent, PartyViewComponent],
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
    MatPaginatorModule
  ],
  providers: [],
})
export class MainModule {}
