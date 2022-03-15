import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { UserRemoveComponent } from './user-remove/user-remove.component';
import { NotVerifyedComponent } from './not-verifyed/not-verifyed.component'; 
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AuthComponent,
    ThankYouComponent,
    PrivacyComponent,
    UserRemoveComponent,
    NotVerifyedComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatIconModule,
    MatButtonModule,
    IonicModule,
    FormsModule
  ]
})
export class AuthModule { }
