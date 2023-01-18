import { Injectable } from '@angular/core';
import { Weather } from '../models/weather-data.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  async fetchWeather(shuffledCitiesArray: number[]) {
    var key = 'd85a9ae7e0ca5eae092258c8d5311482';
    var units = 'metric';
    var base = 'http://api.openweathermap.org/data/2.5/group?';
    var url = `${base}id=${shuffledCitiesArray}&units=${units}&appid=${key}`;
    var filteredWeatherData;

    await fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(data => {
        filteredWeatherData = this.filterData(data.list);
      })
      .catch(error => {
        alert("Something went wrong. Please try again later\n" + error);
      })

    return filteredWeatherData;
  }

  filterData(weatherData: any) {
    return weatherData.map((data: { id: number; name: string; main: { temp: number; }; weather: { icon: string; description: string }[]; }) => {
      return <Weather>{
        cityId: data.id,
        name: data.name,
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };
    })
  }
}
