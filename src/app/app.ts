import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { WeatherDashboard } from './weather-dashboard/weather-dashboard';

import { LocationResult } from './services/weather'; //locationtest

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, WeatherDashboard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild('weatherDashboard') weatherDashboard!: WeatherDashboard;

  protected readonly title = signal('WeatherApp');

  // selectedLocation: string = 'Düsseldorf';
  // displayedLocationName: string = 'Düsseldorf';

  // selectedLocation: string = '';
  selectedLocation: LocationResult | null = null; //locationtest
  displayedLocationName: string = '';

  // vom Header gesendeter Ort (Input-Feld)
  // onLocationSelected(location: string) {
  onLocationSelected(location: LocationResult) { //locationtest
    this.selectedLocation = location;
    console.log("eingegebener Ort:", this.selectedLocation)
  }

  // vom Dashboard gesendeter realer Ortsname
  onLocationNameChange(realName: string) {
    this.displayedLocationName = realName;
    console.log("Ort gefunden?:", this.displayedLocationName)
  }

  onCurrentLocationRequested() {
    this.weatherDashboard.getCurrentLocationWeather();
  }
}
