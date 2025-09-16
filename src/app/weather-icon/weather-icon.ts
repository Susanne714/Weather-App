import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-icon',
  imports: [CommonModule],
  templateUrl: './weather-icon.html',
  styleUrl: './weather-icon.scss'
})
export class WeatherIcon {
  @Input() isDaytime = true; //Nacht-Icon-Steuerung
  @Input() code!: number;

  get iconName(): string {
    if (this.code === 0) return 'sunny';
    if (this.code === 1) return 'slightlyCloudy';
    if (this.code === 2) return 'moderatelyCloudy';
    if (this.code === 3) return 'heavilyCloudy';
    if (this.code === 45) return 'foggy';
    if (this.code === 48) return 'frosty';
    if ([51, 61, 80].includes(this.code)) return 'slightlyRainy';
    if ([53, 63, 81].includes(this.code)) return 'moderatelyRainy';
    if ([55, 65, 82].includes(this.code)) return 'heavilyRainy';
    if ([71, 77, 85].includes(this.code)) return 'slightlySnowy';
    if (this.code === 73) return 'moderatelySnowy';
    if ([75, 86].includes(this.code)) return 'heavilySnowy';
    if ([95, 96, 99].includes(this.code)) return 'thunderstorm';
    if ([56, 57, 66, 67].includes(this.code)) return 'freezingRain';
    return 'unknown';
  }
}
