import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cloud } from '../../conditions/cloud/cloud';
import { NightScene } from '../night-scene/night-scene';

@Component({
  selector: 'app-heavily-cloudy-scene',
  imports: [CommonModule, Cloud, NightScene],
  templateUrl: './heavily-cloudy-scene.html',
  styleUrl: './heavily-cloudy-scene.scss'
})
export class HeavilyCloudyScene {
  @Input() isNight = false;
}
