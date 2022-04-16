import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CallbackComponent } from './callback/callback.component';
import { NotVerifyedComponent } from './not-verifyed/not-verifyed.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { UserRemoveComponent } from './user-remove/user-remove.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  
  { path: '', component: AuthComponent },
  {path:'thank-you',component:ThankYouComponent},
  {path:'user-remove',component:UserRemoveComponent},
  {path:'privacy',component:PrivacyComponent},
  {path:'terms-and-conditions',component:TermsComponent},
  {path:'callback/:app',component:CallbackComponent,
  canActivate:[AuthGuard],
  data: {authGuardPipe:redirectUnauthorizedToLogin} 
},
  {path:'not-verify',component:NotVerifyedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
