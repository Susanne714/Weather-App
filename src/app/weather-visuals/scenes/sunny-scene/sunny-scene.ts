import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NightScene } from '../night-scene/night-scene';

@Component({
  selector: 'app-sunny-scene',
  imports: [CommonModule, NightScene],
  templateUrl: './sunny-scene.html',
  styleUrl: './sunny-scene.scss'
})
export class SunnyScene {
  @Input() isNight = false;
}
