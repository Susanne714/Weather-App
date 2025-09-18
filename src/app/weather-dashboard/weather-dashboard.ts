import { Component, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { CurrentWeather } from '../current-weather/current-weather';
import { WeatherForecast } from '../weather-forecast/weather-forecast';

import { LocationResult } from '../services/weather';

@Component({
  selector: 'app-weather-dashboard',
  imports: [CommonModule, MatCardModule, MatTabsModule, CurrentWeather, WeatherForecast],
  templateUrl: './weather-dashboard.html',
  styleUrls: ['./weather-dashboard.scss']
})
export class WeatherDashboard {
  // @Input() location: string = '';
  @Input() location: LocationResult | null = null; //locationTest
  @Output() locationNameChange = new EventEmitter<string>();
  @ViewChild('currentWeather') currentWeather!: CurrentWeather;

  // 👉 reagiert auf Änderungen von location //locationtest (Funktion neu eingefügt)
  ngOnChanges(changes: SimpleChanges) {
    if (changes['location']?.currentValue && this.currentWeather) {
      const loc = this.location!;
      this.currentWeather.loadWeather(loc.lat, loc.lon, loc.name);
    }
  }

  // Diese Methode wird von App aufgerufen (via ViewChild)
  getCurrentLocationWeather() {
    // sicherstellen, dass child schon existiert
    if (this.currentWeather && typeof this.currentWeather.getCurrentLocationWeather === 'function') {
      this.currentWeather.getCurrentLocationWeather();
    }
  }

  // wird vom child (current-weather) aufgerufen, Weiterleitung an App
  onLocationNameChange(name: string) {
    this.locationNameChange.emit(name);
  }
}