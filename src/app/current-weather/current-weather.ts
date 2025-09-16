import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import { Weather } from '../services/weather';

import { SunnyScene } from '../weather-visuals/scenes/sunny-scene/sunny-scene';
import { CloudyScene } from '../weather-visuals/scenes/cloudy-scene/cloudy-scene';
import { HeavilyCloudyScene } from '../weather-visuals/scenes/heavily-cloudy-scene/heavily-cloudy-scene';
import { RainyScene } from '../weather-visuals/scenes/rainy-scene/rainy-scene';
import { SnowyScene } from '../weather-visuals/scenes/snowy-scene/snowy-scene';
import { FoggyScene } from '../weather-visuals/scenes/foggy-scene/foggy-scene';
import { ThunderstormScene } from '../weather-visuals/scenes/thunderstorm-scene/thunderstorm-scene';
import { HourlyForecast } from '../models/hourly-forecast.interface';
import { WeatherIcon } from '../weather-icon/weather-icon';

@Component({
  selector: 'app-current-weather',
  imports: [CommonModule, DatePipe, SunnyScene, CloudyScene, HeavilyCloudyScene, RainyScene, SnowyScene, FoggyScene, ThunderstormScene, WeatherIcon],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.scss'
})
export class CurrentWeather implements OnInit, OnChanges {
  @Input() location: string = '';
  @Output() locationNameChange = new EventEmitter<string>();
  @ViewChild('forecastContainer') forecastContainer!: ElementRef;

  forecast24h: HourlyForecast[] = [];
  selectedHour: HourlyForecast | null = null;
  isDay = true;
  showArrowLeft = false;
  showArrowRight = true;


  weatherData: any;
  currentWeather: 'sunny' | 'cloudy' | 'rainy' | 'unknown' = 'unknown';
  locationName: string = '';
  currentDate!: Date;
  weatherCode!: number;
  sunrise!: string;
  sunset!: string

  // default location (Düsseldorf)
  private readonly initialLat = 51.316601;
  private readonly initialLon = 6.749072;
  private readonly initialName = 'Düsseldorf';

  constructor(private weatherService: Weather) { }

  ngOnInit() {
    this.loadWeather(this.initialLat, this.initialLon, this.initialName);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['location']?.currentValue) {
      this.loadWeatherByLocation(this.location);
    }
  }

  /** Holt Koordinaten anhand eines Namens und lädt dann Wetterdaten */
  public loadWeatherByLocation(location: string) {
    this.weatherService.getCoordinates(location).subscribe({
      next: (coords: { lat: number; lon: number; name?: string }) => {
        if (coords.lat && coords.lon) {
          const realName = coords.name || location;
          this.loadWeather(coords.lat, coords.lon, realName);
        } else {
          this.handleUnknownLocation();
        }
      },
      error: () => this.handleUnknownLocation()
    });
  }

  private loadWeather(lat: number, lon: number, realName: string) {
    this.weatherService.getWeather(lat, lon).subscribe({
      next: (data) => {
        this.setCurrentWeather(data, realName);
        this.weatherData = this.getWindDirection(this.weatherData);
        this.isDay = this.weatherData?.is_day === 1;

        if (data.hourly) this.setForecastData(data);
        if (data.daily) this.setSunriseSunset(data);

        this.loadMarineData(lat, lon);

        console.log(this.weatherData);
        console.log(this.forecast24h);
      },
      error: () => this.handleUnknownLocation
    });
  }

  private setCurrentWeather(data: any, realName: string): void {
    this.weatherData = data.current_weather;
    this.weatherCode = this.weatherData.weathercode;
    this.locationName = realName;
    this.locationNameChange.emit(this.locationName);
    this.currentDate = this.weatherData.time;
  }

  private getWindDirection(weather: any): any {
    if (weather?.winddirection != null) {
      return {
        ...weather,
        windDirectionLabel: this.getWindDirectionLabel(weather.winddirection)
      };
    }
    return weather;
  }

  private setForecastData(data: any): void {
    this.loadForecastData(data);
  }

  private setSunriseSunset(data: any): void {
    this.sunrise = data.daily.sunrise[0];
    this.sunset = data.daily.sunset[0];
  }

  private loadMarineData(lat: number, lon: number): void {
    this.weatherService.getMarineData(lat, lon).subscribe({
      next: (marine) => {
        if (marine.hourly && marine.hourly.wave_height) {
          this.forecast24h = this.forecast24h.map((fc, index) => ({
            ...fc,
            waveHeight: marine.hourly.wave_height[index] ?? null
          }));
        }

        if (marine.current && marine.current.wave_height != null) {
          this.weatherData = {
            ...this.weatherData,
            waveHeight: marine.current.wave_height
          };
        }
      },
      error: (err) => {
        console.warn("Marine-Daten nicht verfügbar", err)
      }
    });
  }

  public getSceneName(weatherCode: number): 'sunny' | 'cloudy' | 'cloudier' | 'rainy' | 'snowy' | 'foggy' | 'thunderstorm' {
    if ([0].includes(weatherCode)) return 'sunny';
    if ([1, 2].includes(weatherCode)) return 'cloudy';
    if ([3].includes(weatherCode)) return 'cloudier';
    if ([45, 48].includes(weatherCode)) return 'foggy';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) return 'rainy';
    if ([56, 57, 66, 67, 71, 73, 75, 77, 85, 86].includes(weatherCode)) return 'snowy';
    if ([95, 96, 99].includes(weatherCode)) return 'thunderstorm';
    return 'cloudy'; // Fallback
  }

  public getWeatherDescription(weatherCode: number): string {
    if ([0].includes(weatherCode)) return "klar";
    if ([1, 2].includes(weatherCode)) return "leicht bewölkt";
    if ([3].includes(weatherCode)) return "bewölkt";
    if ([45, 48].includes(weatherCode)) return "neblig";
    if ([51, 53, 55].includes(weatherCode)) return "Nieselregen";
    if ([56, 57, 66, 67].includes(weatherCode)) return "gefrierender Regen";
    if ([61, 63, 65, 80, 81, 82].includes(weatherCode)) return "Regen";
    if ([71, 73, 75].includes(weatherCode)) return "Schneefall";
    if ([77, 85, 86].includes(weatherCode)) return "Schneeschauer";
    if ([95, 96, 99].includes(weatherCode)) return "Gewitter";
    return "unbekanntes Wetter";
  }

  /** Fehler-/Fallback-Handler für unbekannte Orte */
  private handleUnknownLocation() {
    this.locationName = 'Ort unbekannt';
    this.locationNameChange.emit(this.locationName);
    this.currentWeather = 'unknown';
  }

  /**Windrichtung ermitteln */
  private getWindDirectionLabel(degrees: number): string {
    const directions = [
      'N', 'NO', 'O', 'SO',
      'S', 'SW', 'W', 'NW'
    ];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  getCurrentLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("Aktuelle Position:", lat, lon);

        // ✅ Ortsnamen über Reverse-Geocoding holen
        this.weatherService.getLocationNameFromCoords(lat, lon).subscribe((name: string) => {
          this.loadWeather(lat, lon, name);
          console.log("Aktuell:", lat, lon, name);
        });
      });
    } else {
      console.log("Geolocation wird nicht unterstützt");
    }
  }

  loadForecastData(apiData: any) {
    console.log("Aufgang:", apiData.daily.sunrise);
    console.log("Untergang:", apiData.daily.sunset);

    const allForecast = this.buildHourlyForecast(apiData);

    const now = new Date(apiData.current_weather.time);
    const startIndex = this.findStartIndex(allForecast, now);

    this.forecast24h = startIndex !== -1
      ? allForecast.slice(startIndex, startIndex + 24)
      : [];

    setTimeout(() => this.updateArrows(), 20);
  }

  private buildHourlyForecast(apiData: any): HourlyForecast[] {
    const sunrises = apiData.daily.sunrise;
    const sunsets = apiData.daily.sunset;
    const days = apiData.daily.time;

    return apiData.hourly.time.map((t: string, index: number) => {
      const hourDate = new Date(t);
      const dayString = t.split('T')[0];
      const dayIndex = days.indexOf(dayString);

      const isDaytime = this.isDaytimeForHour(hourDate, dayIndex, sunrises, sunsets);

      return this.getForecastData(apiData, t, index, isDaytime);
    });
  }

  private getForecastData(apiData: any, time: string, index: number, isDaytime: boolean): HourlyForecast {
    return {
      time,
      temperature: apiData.hourly.temperature_2m[index],
      weathercode: apiData.hourly.weathercode[index],
      windspeed: apiData.hourly.wind_speed_10m[index],
      windgusts: apiData.hourly.wind_gusts_10m[index],
      relativeHumidity: apiData.hourly.relative_humidity_2m[index],
      surfacePressure: apiData.hourly.surface_pressure[index],
      apparentTemperature: apiData.hourly.apparent_temperature[index],
      windDirection: apiData.hourly.wind_direction_10m[index],
      windDirectionLabel: this.getWindDirectionLabel(apiData.hourly.wind_direction_10m[index]),
      windDescription: this.getWindDescription(apiData.hourly.wind_speed_10m[index]),
      isDaytime,
      waveHeight: null // 👈 default-Wert
    };
  }

  private isDaytimeForHour(hourDate: Date, dayIndex: number, sunrises: string[], sunsets: string[]): boolean {
    if (dayIndex === -1) return true;

    const sunriseDate = new Date(sunrises[dayIndex]);
    const sunsetDate = new Date(sunsets[dayIndex]);

    return hourDate.getTime() >= sunriseDate.getTime() && hourDate.getTime() < sunsetDate.getTime();
  }

  private findStartIndex(forecast: HourlyForecast[], now: Date): number {
    return forecast.findIndex(f => new Date(f.time) > now);
  }

  selectHour(hour: HourlyForecast) {
    //gleiche Stunde nochmal klicken = schließen
    if (this.selectedHour === hour) {
      this.selectedHour = null;
    } else {
      this.selectedHour = hour;
    }
  }

  private getWindDescription(speed: number): string {
    if (speed < 1) return "windstill";
    if (speed < 20) return "schwacher Wind";
    if (speed < 30) return "mäßiger Wind";
    if (speed < 40) return "frischer Wind";
    if (speed < 50) return "starker Wind";
    if (speed < 61) return "steifer Wind";
    if (speed < 71) return "stürmischer Wind";
    if (speed < 86) return "Sturm";
    if (speed < 101) return "schwerer Sturm";
    if (speed < 120) return "orkanartiger Sturm";
    return "Sturm/Orakan";
  }

  //24h Forecast Tag-Nacht Anzeige für Icons
  isNightAt(time: string | Date): boolean {
    const t = new Date(time).getTime();
    const sunriseTime = new Date(this.sunrise).getTime();
    const sunsetTime = new Date(this.sunset).getTime();

    return t < sunriseTime || t >= sunsetTime;
  }

  scrollForecast(direction: 'left' | 'right') {
    const el = this.forecastContainer.nativeElement as HTMLElement;
    const scrollWidth = 140; //ggf. noch feiner abstimmen, 136px
    if (direction === 'left') {
      el.scrollBy({ left: -scrollWidth, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: scrollWidth, behavior: 'smooth' })
    }
    setTimeout(() => this.updateArrows(), 300);
  }

  ngAfterViewInit() {
    const el = this.forecastContainer.nativeElement as HTMLElement;
    el.addEventListener('scroll', () => this.updateArrows());
    this.updateArrows();
  }

  updateArrows() {
    const el = this.forecastContainer.nativeElement as HTMLElement;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    this.showArrowLeft = scrollLeft > 0;
    this.showArrowRight = scrollLeft < maxScroll - 1;
  }
}
