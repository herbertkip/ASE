import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _currentWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
  private _forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
  private _apiKey = '9de243494c0b295cca9337e1e96b00e2';
  constructor(private _http: HttpClient) { }

  // returns current weather of the city
  getWeatherData(city) {
    return this._http.get(this._currentWeatherUrl + city + '&APPID=' + this._apiKey + '&units=metric')
      .pipe(map(data => {
          return data;
        }),
        // sometimes error could be network interruption and trying again may solve the problem
        retry(3),
        // handling error
        catchError(error => {
          return throwError(error.message || 'Server Error!');
        })
      );
  }

  // returns 7 days weather forecast of the city
  get5DaysWeatherData(city) {
    return this._http.get(this._forecastUrl + city + '&APPID=' + this._apiKey + '&units=metric')
      .pipe(map(data => {
          return data;
        }),
        retry(3),
        catchError(error => {
          return throwError(error.message || 'Server Error!');
        })
      );
  }
}

