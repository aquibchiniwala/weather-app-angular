import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) { }

  fetchCurrentWeather(city: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8a74dfe57833cb92302a7776463a6b08&units=metric`);
  }

  fetchForecast(city: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=8a74dfe57833cb92302a7776463a6b08&units=metric`);
  }
}
