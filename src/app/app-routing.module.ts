import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => {
  const path = window.location.href   
  sessionStorage.setItem('auth_redirect_url', path);
  
  return redirectUnauthorizedTo(['auth']);
};
const routes: Routes = [
  {path:"",component:AppComponent,children:[
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
      path: '',
      loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
     canActivate:[AuthGuard],
     data: {authGuardPipe:redirectUnauthorizedToLogin} 
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
