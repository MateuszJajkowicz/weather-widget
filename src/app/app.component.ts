import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  filteredWeatherData: undefined;
  refreshInterval: any;
  citiesInterval: any;

  constructor(private weatherService: WeatherService) { }

  async ngOnInit() {
    var shuffledCitiesArray: number[] = [];

    shuffledCitiesArray = this.shuffleArray();
    this.citiesInterval = setInterval(() => {
      shuffledCitiesArray = this.shuffleArray();
    }, 60000);

    this.filteredWeatherData = await this.weatherService.fetchWeather(shuffledCitiesArray);// api call
    this.refreshInterval = setInterval(async () => {
      this.filteredWeatherData = await this.weatherService.fetchWeather(shuffledCitiesArray);// api call
    }, 10000);
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    if (this.citiesInterval) {
      clearInterval(this.citiesInterval);
    }
  }

  shuffleArray() {
    // ids correspond respectively to  [Lodz, Warsaw, Berlin, New York, London]
    var citiesArray = [3093133, 756135, 2950159, 5128581, 2643743];
    var m = citiesArray.length, t, i;

    while (m) {
    i = Math.floor(Math.random() * m--);
    t = citiesArray[m];
    citiesArray[m] = citiesArray[i];
    citiesArray[i] = t;
    }

    return citiesArray.slice(0,3);
  }

  handleOpeningCityPage(cityId : number) {
    window.open(`https://openweathermap.org/city/${cityId}`);
  }
}
