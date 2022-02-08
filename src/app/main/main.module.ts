import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MainScreenComponent } from './main-screen.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PartyViewComponent } from './party-view.component';
import {ClipboardModule} from '@angular/cdk/clipboard'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatTableModule} from '@angular/material/table';


import {IonicModule} from '@ionic/angular'

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
    MatTableModule,
    IonicModule
  ],
  providers: [],
})
export class MainModule {}
