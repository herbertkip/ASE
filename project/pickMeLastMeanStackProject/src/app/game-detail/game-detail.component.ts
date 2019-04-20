import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { WeatherService } from '../weather.service';
import { AuthService } from '../auth/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-book-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  location: any;
  // to store city name in localstorage
  value: any;
  // to store searched city's weather data
  weatherData: any;
  weatherForcast: any;
  game: any;
  weather = {};
  datas = [];
  edit_allowed: boolean;
  authSer: any;
  email: string;
  verify_email: string;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private weatherService: WeatherService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authSer = this.authService;
    this.getGameDetails(this.route.snapshot.params['id']);
    if (this.value != null) {
      this.location = JSON.parse(this.game.game_loc);
    } else {
      this.location = 'Olathe';
    }
    this.weatherService.getWeatherData(this.location)
      .subscribe(res => {
        console.log(res);
        this.weatherData = res;
      });

    this.weatherService.get5DaysWeatherData(this.location)
      .subscribe(res => {
        console.log(res);
        this.weatherForcast = res;
        this.datas = this.weatherForcast.list;
        // console.log(this.datas);
      });
    this.email = JSON.parse(this.game.org_email_id);
    this.verify_email = JSON.parse(this.authSer.user.email);
    this.edit_allowed = _.isEqual(this.email, this.verify_email);
  }

  getGameDetails(id) {
    this.api.getGame(id)
      .subscribe(data => {
        console.log(data);
        this.game = data;
      });
  }

  deleteGame(id) {
    this.api.deleteGame(id)
      .subscribe(res => {
          this.router.navigate(['/games']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
