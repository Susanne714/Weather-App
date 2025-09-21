import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { WeatherDashboard } from '../weather-dashboard/weather-dashboard';
import { LocationResult } from '../services/weather';
import { WeatherBridge } from '../services/weather-bridge';

@Component({
  selector: 'app-dashboard-wrapper',
  imports: [WeatherDashboard],
  templateUrl: './dashboard-wrapper.html',
  styleUrl: './dashboard-wrapper.scss'
})
// export class DashboardWrapper {
//   @Input() location: LocationResult | null = null;
//   @Output() locationNameChange = new EventEmitter<string>();

//   @ViewChild(WeatherDashboard) weatherDashboard!: WeatherDashboard;

//   constructor(private weatherBridge: WeatherBridge) { }

//   ngOnInit() {
//     this.weatherBridge.locationSelected$.subscribe(loc => {
//       this.location = loc;
//       console.log("Beatles");
//     });

//     this.weatherBridge.locationRequest$.subscribe(() => {
//       this.weatherDashboard.getCurrentLocationWeather();

//     });
//   }

//   onLocationNameChange(name: string) {
//     console.log("WRAPPER: onLocationNameChange() -> name =", name);
//     this.locationNameChange.emit(name);
//   }
// }

export class DashboardWrapper {
  @Input() location: LocationResult | null = null;
  @Output() locationNameChange = new EventEmitter<string>();

  @ViewChild(WeatherDashboard) weatherDashboard!: WeatherDashboard;

  constructor(private weatherBridge: WeatherBridge) { }

  ngOnInit() {
    // Sucheingaben aus dem Header
    this.weatherBridge.locationSelected$.subscribe(loc => {
      this.location = loc;
      console.log("Beatles");
    });

    // Standort per Button
    this.weatherBridge.locationRequest$.subscribe(() => {
      this.weatherDashboard.getCurrentLocationWeather();
    });

    // 👉 letzten bekannten Ort abrufen
    const lastLocation = this.weatherBridge.getLastLocation();
    if (lastLocation) {
      this.location = lastLocation;
      console.log("Wrapper: letzter Ort =", lastLocation.name);
    }
  }

  onLocationNameChange(name: string) {
    console.log("WRAPPER: onLocationNameChange() -> name =", name);
    this.locationNameChange.emit(name);
  }
}
