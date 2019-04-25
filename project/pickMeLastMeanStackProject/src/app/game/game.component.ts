import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { AuthService } from '../auth/auth.service';
import {Validators} from '@angular/forms';
import {Directive, Input, OnDestroy, OnChanges, SimpleChange} from '@angular/core';
import {ClusterManager} from '@agm/js-marker-clusterer';
import {MarkerManager, InfoWindowManager} from '@agm/core';




@Component({
  selector: 'app-book',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  title: string = ' Pick me Last Game Locations';
  //{lat: 38.8838856, lng: -94.81887 }
//lat:[{38.8838856},{39.100105}]
  //lng:[{-94.81887},{-94.5781416}]
  lat: number = 38.8838856;
  lng: number = -94.81887;

  lat1: number = 38.8838856;
  lng1: number = -94.81887;

  lat2: number = 39.100105;
  lng2: number = -94.5781416;

  lat3: number = 38.9444321;
  lng3: number = -94.3307931;

  lat4: number = 39.0416718;
  lng4: number = -94.7202376;
  //lat: number = 38.8838856;
  //lng: number = -94.81887;

  //lat5 = ['game_loc_lat'];
  //lng5 = ['game_loc_lat'];
  constructor(private api: ApiService, private authService: AuthService


  markers = [
    { lat: 38.8838856, lng: -94.81887 },
    { lat: 39.100105, lng: -94.5781416 },
    { lat: 38.9444321, lng: -94.3307931 },
    { lat: 39.0416718, lng: -94.7202376 }
  ];
  games: any;
  displayedColumns = ['game_name', 'game_loc', 'team', 'organizer', 'contact_org'];
  //displayedColumns = ['game_name', 'game_loc','game_loc_lat','game_loc_lng', 'team', 'organizer', 'contact_org'];
  dataSource = new BookDataSource(this.api);
) { }

  ngOnInit() {
    this.api.getGames()
      .subscribe(res => {
        console.log(res);
        this.games = res;
      }, err => {
        console.log(err);
      });
  }
}

export class BookDataSource extends DataSource<any> {

  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getGames();
  }

  disconnect() {

  }
}
