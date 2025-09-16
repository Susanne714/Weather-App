import { Component, Input } from '@angular/core';
import { Rain } from '../../conditions/rain/rain';
import { CommonModule } from '@angular/common';
import { NightScene } from '../night-scene/night-scene';

@Component({
  selector: 'app-rainy-scene',
  imports: [CommonModule, Rain, NightScene],
  templateUrl: './rainy-scene.html',
  styleUrl: './rainy-scene.scss'
})
export class RainyScene {
  @Input() isNight = false;
}
