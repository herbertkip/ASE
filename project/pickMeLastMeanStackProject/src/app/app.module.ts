import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';

import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import {Directive, Input, OnDestroy, OnChanges, OnInit, SimpleChange} from '@angular/core';

import {MarkerManager, InfoWindowManager} from '@agm/core';



import { WeatherService } from './weather.service';



import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import {LoginActivate} from './guards/auth-guard.service';


const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {title: 'Login Page'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login Page'},
  },
  {
    path: 'games',
    component: GameComponent,
    data: { title: 'Game List'},
    canActivate: [ LoginActivate ]
  },
  {
    path: 'game-details/:id',
    component: GameDetailComponent,
    data: { title: 'Game Details'},
    canActivate: [ LoginActivate ]
  },
  {
    path: 'game-create',
    component: GameCreateComponent,
    data: { title: 'Create Game'},
    canActivate: [ LoginActivate ]
  },
  {
    path: 'game-edit/:id',
    component: GameEditComponent,
    data: { title: 'Edit Game'},
    canActivate: [ LoginActivate ]
  },
  { path: '',
    redirectTo: '/games',
    pathMatch: 'full',
    canActivate: [ LoginActivate ]
  }
];

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAYfl7Vw1_O3P539BwO3RCr9Z6rIWVH0Rs',
  authDomain: 'pickmelast-da672.firebaseapp.com',
  databaseURL: 'https://pickmelast-da672.firebaseio.com',
  projectId: 'pickmelast-da672',
  storageBucket: 'pickmelast-da672.appspot.com',
  messagingSenderId: '808898090403'
};

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameDetailComponent,
    GameCreateComponent,
    GameEditComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    MatFormFieldModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyArZIFha0y7peO1Lfiep4Va1TeZr9B9gx4'
    }),
  ],
  providers: [AngularFireAuth, WeatherService, LoginActivate],
  bootstrap: [AppComponent]
})

export class AppModule { }


