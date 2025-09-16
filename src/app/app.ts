import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { WeatherDashboard } from './weather-dashboard/weather-dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, WeatherDashboard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild('weatherDashboard') weatherDashboard!: WeatherDashboard;

  protected readonly title = signal('WeatherApp');

  selectedLocation: string = 'Düsseldorf';
  // Für Anzeige des realen Ortsnamens im Header oder irgendwo anders
  displayedLocationName: string = 'Düsseldorf';

  // vom Header gesendeter Ort (Input-Feld)
  onLocationSelected(location: string) {
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
