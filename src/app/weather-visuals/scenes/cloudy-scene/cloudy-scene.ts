import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cloud } from '../../conditions/cloud/cloud';
import { NightScene } from '../night-scene/night-scene';

@Component({
  selector: 'app-cloudy-scene',
  imports: [CommonModule, Cloud, NightScene],
  templateUrl: './cloudy-scene.html',
  styleUrl: './cloudy-scene.scss'
})
export class CloudyScene {
  @Input() isNight = false;
}
