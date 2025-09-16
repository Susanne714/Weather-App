import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NightScene } from '../night-scene/night-scene';

@Component({
  selector: 'app-foggy-scene',
  imports: [CommonModule, NightScene],
  templateUrl: './foggy-scene.html',
  styleUrl: './foggy-scene.scss'
})
export class FoggyScene {
  @Input() isNight = false;
}
