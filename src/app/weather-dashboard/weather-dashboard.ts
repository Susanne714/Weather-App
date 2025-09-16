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

/** Lädt Wetterdaten anhand von Koordinaten */
// private loadWeather(lat: number, lon: number, realName: string) {
//   this.weatherService.getWeather(lat, lon).subscribe({
//     next: (data) => {
//       this.weatherData = data.current_weather;
//       this.weatherCode = this.weatherData.weathercode;
//       this.locationName = realName;
//       this.locationNameChange.emit(this.locationName);
//       this.currentDate = this.weatherData.time;

//       if (this.weatherData?.winddirection != null) {
//         this.weatherData = {
//           ...this.weatherData,
//           windDirectionLabel: this.getWindDirectionLabel(this.weatherData.winddirection)
//         };
//       }

//       //Tageszeit aus API übernehmen
//       this.isDay = this.weatherData?.is_day === 1;

//       //Forecast-Daten extrahieren und in forecast24h speichern
//       if (data.hourly) {
//         this.loadForecastData(data);
//       }

//       if (data.daily) {
//         this.sunrise = data.daily.sunrise[0];
//         this.sunset = data.daily.sunset[0];
//       }

//       // 🌊 Marine-Daten holen und anhängen
//       this.weatherService.getMarineData(lat, lon).subscribe({
//         next: (marine) => {
//           if (marine.hourly && marine.hourly.wave_height) {
//             this.forecast24h = this.forecast24h.map((fc, index) => ({
//               ...fc,
//               waveHeight: marine.hourly.wave_height[index] ?? null
//             }));
//           }

//           if (marine.current && marine.current.wave_height != null) {
//             this.weatherData = {
//               ...this.weatherData,
//               waveHeight: marine.current.wave_height
//             };
//           }
//         },
//         error: (err) => {
//           console.warn("Marine-Daten nicht verfügbar", err);
//         }
//       });

//       console.log(this.weatherData);
//       console.log(this.forecast24h);

//     },
//     error: () => this.handleUnknownLocation()
//   });
// }



// loadForecastData(apiData: any) {
//   const sunrises = apiData.daily.sunrise; // Array z.B. ["2025-09-05T06:52", ...]
//   const sunsets = apiData.daily.sunset;  // Array z.B. ["2025-09-05T20:10", ...]
//   const days = apiData.daily.time;    // Array z.B. ["2025-09-05", "2025-09-06", ...]
//   console.log("Aufgang:", apiData.daily.sunrise);
//   console.log("Untergang", apiData.daily.sunset);

//   // alle Stunden ins Forecast-Array packen
//   const allForecast: HourlyForecast[] = apiData.hourly.time.map((t: string, index: number) => {
//     const hourDate = new Date(t);         // Forecast-Zeit als Date
//     const dayString = t.split('T')[0];      // "2025-09-05"
//     const dayIndex = days.indexOf(dayString);

//     let isDaytime = true;

//     if (dayIndex !== -1) {
//       const sunriseDate = new Date(sunrises[dayIndex]);
//       const sunsetDate = new Date(sunsets[dayIndex]);

//       // Tag/Nacht korrekt prüfen
//       isDaytime = hourDate.getTime() >= sunriseDate.getTime() && hourDate.getTime() < sunsetDate.getTime();
//     }

//     return {
//       time: t,
//       temperature: apiData.hourly.temperature_2m[index],
//       weathercode: apiData.hourly.weathercode[index],
//       windspeed: apiData.hourly.wind_speed_10m[index],
//       windgusts: apiData.hourly.wind_gusts_10m[index],
//       relativeHumidity: apiData.hourly.relative_humidity_2m[index],
//       surfacePressure: apiData.hourly.surface_pressure[index],
//       apparentTemperature: apiData.hourly.apparent_temperature[index],
//       windDirection: apiData.hourly.wind_direction_10m[index],
//       windDirectionLabel: this.getWindDirectionLabel(apiData.hourly.wind_direction_10m[index]),
//       windDescription: this.getWindDescription(apiData.hourly.wind_speed_10m[index]),
//       isDaytime
//     };
//   });

//   const now = new Date(apiData.current_weather.time);

//   // Index der ersten Stunde >= jetzt
//   const startIndex = allForecast.findIndex(f => new Date(f.time) > now);

//   this.forecast24h = startIndex !== -1
//     ? allForecast.slice(startIndex, startIndex + 24)
//     : [];
// }

