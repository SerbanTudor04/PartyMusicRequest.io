import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { UserRemoveComponent } from './user-remove/user-remove.component';

const routes: Routes = [
  
  { path: '', component: AuthComponent },
  {path:'thank-you',component:ThankYouComponent},
  {path:'user-remove',component:UserRemoveComponent},
  {path:'privacy',component:PrivacyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
