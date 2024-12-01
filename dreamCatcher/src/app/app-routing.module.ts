import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MainpageComponent} from './mainpage/mainpage.component';
import {TripspageComponent} from './tripspage/tripspage.component';
import {FavoritelistpageComponent} from  './favoritelistpage/favoritelistpage.component';
import {UserpageComponent} from  './userpage/userpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';

const routes: Routes = [
  {path: '', component: MainpageComponent},
  {path: 'user', component: UserpageComponent},
  {path: 'favlist', component: FavoritelistpageComponent},
  {path: 'favlist/:id', component: FavoritelistpageComponent},
  {path: 'trip', component: TripspageComponent},
  {path: 'trip/:id', component: TripspageComponent},
  {path: 'login', component: LoginpageComponent},
  {path: 'signup', component: SignuppageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
