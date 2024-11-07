import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MainpageComponent} from './mainpage/mainpage.component';
import {TripspageComponent} from './tripspage/tripspage.component';
import {FavoritelistpageComponent} from  './favoritelistpage/favoritelistpage.component';
import {UserpageComponent} from  './userpage/userpage.component';

const routes: Routes = [
  {path: '', component: MainpageComponent},
  {path: 'user', component: UserpageComponent},
  {path: 'favlist', component: FavoritelistpageComponent},
  {path: 'trips', component: TripspageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
