import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { AuthService } from '../auth/auth.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  games: any;
  displayedColumns = ['game_name', 'game_loc', 'team', 'organizer', 'contact_org'];
  dataSource = new BookDataSource(this.api);

  constructor(private api: ApiService, private authService: AuthService) { }

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

export class AppComponent {
  title: string = 'Pick me Last Game Locations';
  lat: number = 51.678418;
  lng: number = 7.809007;
  markers = [
    { lat: 38.8838856, lng: -94.81887 , alpha: 1 },
    { lat: 39.100105, lng: -94.5781416, alpha: 1 },
    { lat: 38.9444321, lng: -94.3307931, alpha: 1 },
    { lat: 39.0416718, lng: -94.7202376, alpha: 1 }

  ];
}
