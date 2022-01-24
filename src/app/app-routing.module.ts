import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
// const redirectLoggedInToSendEmail = () => redirectLoggedInTo(['send-email']);

const routes: Routes = [
  {path:"",component:AppComponent,children:[
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
      path: 'main',
      loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
     canActivate:[AuthGuard] 
    },
    {
      path:"",redirectTo:"main",pathMatch:"full"
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
