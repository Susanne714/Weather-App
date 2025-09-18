import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';

import { LocationResult } from './services/weather';
import { WeatherBridge } from './services/weather-bridge';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('WeatherApp');

  selectedLocation: LocationResult | null = null;
  displayedLocationName: string = '';

  constructor(private weatherBridge: WeatherBridge) { }

  // vom Header gesendeter Ort (Input-Feld)
  onLocationSelected(location: LocationResult) {
    this.selectedLocation = location;
    console.log("eingegebener Ort:", this.selectedLocation)
    console.log("APP: onLocationSelected() -> selectedLocation =", this.selectedLocation);
    this.weatherBridge.selectLocation(location); // 👉 Service informiert Wrapper
  }

  // vom Dashboard gesendeter realer Ortsname --> Testen, ob weiterhin funktional
  // onLocationNameChange(realName: string) {
  //   this.displayedLocationName = realName;
  //   console.log("Ort gefunden?:", this.displayedLocationName)
  //   console.log("APP: onLocationNameChange() -> displayedLocationName =", this.displayedLocationName);
  // }

  onCurrentLocationRequested() {
    console.log("APP: onCurrentLocationRequested() -> call Wrapper");
    this.weatherBridge.requestCurrentLocation();
  }
}