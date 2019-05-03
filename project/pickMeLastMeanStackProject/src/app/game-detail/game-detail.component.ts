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
  weatherData: any;
  weatherForcast: any;
  game: any;
  weather = {};
  edit_allowed: boolean;
  authSer: any;
  email: string;
  verify_email: string;
  emailString = [];
  showWeatherDtl = false;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private weatherService: WeatherService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authSer = this.authService;
    this.getGameDetails(this.route.snapshot.params['id']);
    this.email = JSON.parse(this.game.org_email_id);
    this.verify_email = JSON.parse(this.authSer.user.email);
    this.edit_allowed = _.isEqual(this.email, this.verify_email);
    this.showWeatherDtl = false;
  }
  showWeatherForecast() {
    this.weatherService.getWeatherData(this.game.game_loc)
      .subscribe(res => {
        console.log(res);
        this.weatherData = res;
      });
    this.weatherService.get5DaysWeatherData(this.game.game_loc)
      .subscribe(res => {
        console.log(res);
        this.weatherForcast = res;
      });
    this.showWeatherDtl = true;
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

  enrollInToGame(id) {
    this.emailString = this.game.player_info;
    const isPresent = this.emailString.includes(this.authSer.user.email);
    if (!isPresent) {
      this.emailString.push(this.authSer.user.email);
      this.game.player_info = this.emailString;
    }

    this.api.enrollIntoGame(id, this.game)
      .subscribe(res => {
          this.router.navigate(['/games']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
}
