import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { UserpageComponent } from './userpage/userpage.component';
import { FavoritelistpageComponent } from './favoritelistpage/favoritelistpage.component';
import { TripspageComponent } from './tripspage/tripspage.component';
import { HeaderComponent } from './header/header.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {DreamCatcherProxyServiceService} from './dream-catcher-proxy-service.service';
import { provideHttpClient } from '@angular/common/http';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocationModalComponent } from './location-modal/location-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    UserpageComponent,
    FavoritelistpageComponent,
    TripspageComponent,
    HeaderComponent,
    LocationModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [
    provideHttpClient(),
    DreamCatcherProxyServiceService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
