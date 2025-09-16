import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rain } from '../../conditions/rain/rain';
import { NightScene } from '../night-scene/night-scene';

@Component({
  selector: 'app-thunderstorm-scene',
  imports: [CommonModule, Rain, NightScene],
  templateUrl: './thunderstorm-scene.html',
  styleUrl: './thunderstorm-scene.scss'
})
export class ThunderstormScene {
  @Input() weatherCode!: number;
  @Input() isNight = false;

  get showRain(): boolean {
    return this.weatherCode === 96 || this.weatherCode === 99;
  }
}