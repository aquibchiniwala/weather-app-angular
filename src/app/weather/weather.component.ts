import { Component, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  weekday: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  @Input()
  city: string;

  weather: any;
  forecasts: Array<any> = new Array<any>();

  constructor(private service: WeatherService) { }

  getIconUrl(iconID: string) {
    const iconURL = '../../assets/weather-icons/';
    // tslint:disable-next-line: max-line-length
    return iconID === '01d' ? iconURL + 'day.svg' : iconID === '01n' ? iconURL + 'night.svg' : iconID === '02d' ? iconURL + 'cloudy-day-3.svg' : iconID === '02n' ? iconURL + 'cloudy-night-3.svg' : iconID === '03d' || iconID === '03n' || iconID === '04d' || iconID === '04n' ? iconURL + 'cloudy.svg' : iconID === '09d' || iconID === '09n' ? iconURL + 'rainy-5.svg' : iconID === '10d' ? iconURL + 'rainy-1.svg' : iconID === '10n' ? iconURL + 'rainy-night.svg' : iconID === '11d' || iconID === '11n' ? iconURL + 'thunder.svg' : iconID === '13d' ? iconURL + 'snowy-3.svg' : iconID === '13n' ? iconURL + 'snowy-6.svg' : iconURL + 'mist.svg';
  }

  getCurrentWeather() {
    this.service.fetchCurrentWeather(this.city).subscribe((data: any) => {
      const iconID = data.weather[0].icon;
      this.weather = {
        city: data.name,
        date: new Date(data.dt * 1000),
        weather: data.weather[0].main,
        desc: data.weather[0].description,
        icon: this.getIconUrl(iconID),
        temp: data.main.temp,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
        wind: data.wind.speed,
        humidity: data.main.humidity
      };
      console.log(data);
      this.getForecast();
    }, (error) => {
      alert(error.error.message);
    });
  }

  // getFforecast() {
  //   this.service.fetchForecast(this.city).subscribe((data: any) => {
  //     let i = 0;
  //     data.list.forEach(day => {
  //       const iconID = day.weather[0].icon;
  //       this.forecast[i++] = {
  //         date: new Date(day.dt * 1000).toDateString(),
  //         data: {
  //           dateTime: new Date(day.dt * 1000),
  //           weather: day.weather[0].main,
  //           desc: day.weather[0].description,
  //           icon: this.getIconUrl(iconID),
  //           temp: day.main.temp,
  //           minTemp: day.main.temp_min,
  //           maxTemp: day.main.temp_max,
  //           wind: day.wind.speed,
  //           humidity: day.main.humidity
  //         }
  //       };
  //     });

  //     console.log(this.forecast, "forecast");
  //   });
  // }

  getForecast() {
    this.service.fetchForecast(this.city).subscribe((data: any) => {
      let i = 0;
      for (let day = 0; day < 40; day++) {
        const currentDay = new Date(data.list[day].dt * 1000).getDay();
        const iconID = data.list[day].weather[0].icon;
        this.forecasts[i] = {
          date: new Date(data.list[day].dt * 1000).toDateString(),
          hourlyWeather: []
        };

        while (data.list[day] && new Date(data.list[day].dt * 1000).getDay() === currentDay) {

          this.forecasts[i].hourlyWeather.push({
            data: {
              dateTime: new Date(data.list[day].dt * 1000),
              weather: data.list[day].weather[0].main,
              desc: data.list[day].weather[0].description,
              icon: this.getIconUrl(iconID),
              temp: data.list[day].main.temp,
              minTemp: data.list[day].main.temp_min,
              maxTemp: data.list[day].main.temp_max,
              wind: data.list[day].wind.speed,
              humidity: data.list[day].main.humidity
            }
          });
          day++;
        }
        day--;
        i++;
      }
    }, (error) => {
      alert(error.error.message);
    });
  }
}
