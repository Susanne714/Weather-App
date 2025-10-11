import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Weather } from '../services/weather';
import { DailyForecast } from '../models/daily-forecast.interface';

@Component({
  selector: 'app-weather-forecast',
  imports: [CommonModule],
  templateUrl: './weather-forecast.html',
  styleUrl: './weather-forecast.scss'
})
export class WeatherForecast {
  forecast14d: DailyForecast[] = [];

  weatherData: any;

  // private readonly initialLat = 51.316601;
  // private readonly initialLon = 6.749072;
  // private readonly initialName = 'Düsseldorf';

  private readonly initialLat = 52.371693;
  private readonly initialLon = 4.522095;
  private readonly initialName = 'Zandvoort';

  constructor(private weatherService: Weather) { }

  ngOnInit() {
    this.loadWeather14(this.initialLat, this.initialLon);
  }

  // loadWeather14(lat: number, lon: number) {
  //   this.weatherService.getWeather(lat, lon).subscribe({
  //     next: (data) => {
  //       this.weatherData = data.daily;
  //       console.log("Wetterdaten:", this.weatherData);

  //     }
  //   })
  // }

  // loadWeather14(lat: number, lon: number) {
  //   this.weatherService.getWeather(lat, lon).subscribe({
  //     next: (data) => {
  //       const daily = data.daily;
  //       this.forecast14d = daily.time.map((date: string, i: number) => ({
  //         date,
  //         temp: daily.temperature_2m_mean[i]
  //       }));
  //       console.log('Vorhersage 14 Tage:', this.forecast14d);
  //     },
  //     error: (err) => console.error('Fehler beim Abruf:', err)
  //   });
  // }

  loadWeather14(lat: number, lon: number) {
    this.weatherService.getWeather(lat, lon).subscribe({
      next: (data) => {
        this.forecast14d = this.buildDailyForecast(data);
        this.loadMarineData14(lat, lon);
        console.log("Forecast14d:", this.forecast14d);


      },
      error: (err) => console.error('Fehler beim Abruf:', err)
    });
  }

  private buildDailyForecast(apiData: any) {
    return apiData.daily.time.map((date: string, index: number) => {
      return {
        date,
        temperatureMean: apiData.daily.temperature_2m_mean[index],
        windSpeed: apiData.daily.wind_speed_10m_max[index],
        windDirection: apiData.daily.wind_direction_10m_dominant[index],
        windDirectionLabel: this.getWindDirectionLabel(apiData.daily.wind_direction_10m_dominant[index]),
        windGusts: apiData.daily.wind_gusts_10m_max[index],
        tempMin: apiData.daily.temperature_2m_min[index],
        tempMax: apiData.daily.temperature_2m_max[index],
        waveHeight: null,
      }
    })
  }

  private getWindDirectionLabel(degrees: number): string {
    const directions = [
      'N', 'NO', 'O', 'SO',
      'S', 'SW', 'W', 'NW'
    ];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  private loadMarineData14(lat: number, lon: number): void {
    this.weatherService.getMarineData(lat, lon).subscribe({
      next: (marine) => {
        if (marine.daily && marine.daily.wave_height_max) {
          // Gleiche Anzahl von Tagen → Werte zuweisen
          this.forecast14d = this.forecast14d.map((fc, index) => ({
            ...fc,
            waveHeight: marine.daily.wave_height_max[index] ?? null
          }));
        }
      },
      error: (err) => {
        console.warn("Marine-Daten nicht verfügbar (14 Tage)", err);
      }
    });
  }

}
