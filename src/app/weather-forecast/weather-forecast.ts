import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Weather } from '../services/weather';
import { DailyForecast } from '../models/daily-forecast.interface';
import { WeatherIcon } from '../weather-icon/weather-icon';

@Component({
  selector: 'app-weather-forecast',
  imports: [CommonModule, WeatherIcon],
  templateUrl: './weather-forecast.html',
  styleUrl: './weather-forecast.scss'
})
export class WeatherForecast {
  forecast14d: DailyForecast[] = [];
  showLongWeekday = true; // 👈 Einfach umstellen (true = lang, false = kurz): Anzeige für Responsive ggf anpassen, falls nicht notwendig: löschen.
  selectedDay: DailyForecast | null = null;
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

  loadWeather14(lat: number, lon: number) {
    this.weatherService.getWeather(lat, lon).subscribe({
      next: (data) => {
        this.forecast14d = this.buildDailyForecast(data);
        const analyzedHourly = this.analyzeHourlyData(data);

        // Wir fügen die Mini-Vorschau-Daten jedem Tagesobjekt hinzu:
        this.forecast14d = this.forecast14d.map(day => ({
          ...day,
          miniForecast: analyzedHourly[day.date] ?? []
        }));
        // this.applyDaySegments(data);
        this.selectedDay = this.forecast14d[0];
        this.loadMarineData14(lat, lon);
        console.log("Forecast14d:", this.forecast14d);


      },
      error: (err) => console.error('Fehler beim Abruf:', err)
    });
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
        this.selectedDay = this.forecast14d[0];
        console.log("Wellen:", marine.daily.wave_height_max)
      },
      error: (err) => {
        console.warn("Marine-Daten nicht verfügbar (14 Tage)", err);
      }
    });
  }

  private buildDailyForecast(apiData: any) {
    return apiData.daily.time.map((date: string, index: number) => {
      const daylightSeconds = apiData.daily.daylight_duration[index];
      const daylightHours = Math.floor(daylightSeconds / 3600);
      const daylightMinutes = Math.round((daylightSeconds % 3600) / 60);
      return {
        date,
        dateLabel: this.formatDateLabel(date, true),
        temperatureMean: apiData.daily.temperature_2m_mean[index],
        weatherCode: apiData.daily.weather_code[index],
        windSpeed: apiData.daily.wind_speed_10m_max[index],
        windDirection: apiData.daily.wind_direction_10m_dominant[index],
        windDirectionLabel: this.getWindDirectionLabel(apiData.daily.wind_direction_10m_dominant[index]),
        windGusts: apiData.daily.wind_gusts_10m_max[index],
        tempMin: apiData.daily.temperature_2m_min[index],
        tempMax: apiData.daily.temperature_2m_max[index],
        waveHeight: null,
        uvIndex: Math.round(apiData.daily.uv_index_max[index]),
        daylightDuration: `${daylightHours} h ${daylightMinutes} min`,
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

  private formatDateLabel(dateString: string, longWeekday: boolean = false): string {
    const date = new Date(dateString);
    const today = new Date();

    const isToday = date.toDateString() === today.toDateString();

    if (isToday) return 'heute';

    const options: Intl.DateTimeFormatOptions = { weekday: longWeekday ? 'long' : 'short', day: '2-digit', month: '2-digit' };
    const formatted = date.toLocaleDateString('de-DE', options);

    return formatted.replace(',', ',').replace(/\s+/g, ' ');
  }

  selectDay(day: DailyForecast) {
    this.selectedDay = day;
  }

  public getUvCategory(uv: number): string {
    if (uv <= 2) return 'niedrig';
    if (uv <= 5) return 'mäßig';
    if (uv <= 7) return 'hoch';
    if (uv <= 10) return 'sehr hoch';
    return 'extrem';
  }

  /** Start Analyse für Forecast je Tageszeit (Abschnitt) */
  private analyzeHourlyData(apiData: any) {
    const intervals = this.getDayIntervals();
    const resultsByDay = this.groupHourlyDataByDate(apiData);
    return this.analyzeByIntervals(resultsByDay, intervals);
  }

  /** 1) Gibt die definierten Zeitabschnitte des Tages zurück */
  private getDayIntervals() {
    return [
      { name: 'Vormittag', start: 6, end: 12, isDayTime: true },
      { name: 'Nachmittag', start: 12, end: 18, isDayTime: true },
      { name: 'Abend', start: 18, end: 24, isDayTime: true },
      { name: 'Nacht', start: 0, end: 6, isDayTime: false },
    ];
  }

  /** 2) Gruppiert die API-Stundenwerte nach Datum */
  private groupHourlyDataByDate(apiData: any): Record<string, any[]> {
    const grouped: Record<string, any[]> = {};

    apiData.hourly.time.forEach((time: string, index: number) => {
      const date = time.split('T')[0];
      const hour = new Date(time).getHours();

      const entry = {
        hour,
        temp: apiData.hourly.temperature_2m[index],
        code: apiData.hourly.weathercode[index],
        windSpeed: apiData.hourly.wind_speed_10m[index],
        windDirection: apiData.hourly.wind_direction_10m[index],
        windGusts: apiData.hourly.wind_gusts_10m[index],
      };

      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(entry);
    });

    return grouped;
  }

  /** 3) Analysiert jede Tagesgruppe für alle Zeitintervalle */
  private analyzeByIntervals(
    resultsByDay: Record<string, any[]>,
    intervals: { name: string; start: number; end: number; isDayTime: boolean }[]
  ): Record<string, any[]> {
    const analyzed: Record<string, any[]> = {};

    for (const [day, hours] of Object.entries(resultsByDay)) {
      analyzed[day] = intervals
        .map(interval => this.analyzeInterval(hours, interval))
        .filter(Boolean); // entfernt leere Intervalle
    }

    return analyzed;
  }

  /** 4) Analysiert ein einzelnes Zeitintervall (z. B. "Vormittag") */
  private analyzeInterval(hours: any[], interval: any) {
    const section = hours.filter(
      h => h.hour >= interval.start && h.hour < interval.end
    );

    if (section.length === 0) return null;

    const maxTemp = this.getPeak(section, 'max');
    const minTemp = this.getPeak(section, 'min');

    const highest = this.withWindLabel(maxTemp);
    const lowest = this.withWindLabel(minTemp);

    return {
      interval: interval.name,
      isDayTime: interval.isDayTime,
      highest,
      lowest,
      display: interval.isDayTime ? highest : lowest,
    };
  }

  /** 5) Gibt den Temperatur-Peak (max/min) eines Abschnitts zurück */
  private getPeak(section: any[], type: 'max' | 'min') {
    return section.reduce((a, b) =>
      type === 'max' ? (b.temp > a.temp ? b : a) : (b.temp < a.temp ? b : a)
    );
  }

  /** 6) Fügt Windrichtungslabel hinzu */
  private withWindLabel(base: any) {
    return {
      ...base,
      windDirectionLabel: this.getWindDirectionLabel(base.windDirection),
    };
  }

}
