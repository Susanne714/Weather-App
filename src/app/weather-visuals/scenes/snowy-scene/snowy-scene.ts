import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NightScene } from '../night-scene/night-scene';

@Component({
  selector: 'app-snowy-scene',
  imports: [CommonModule, NightScene],
  templateUrl: './snowy-scene.html',
  styleUrl: './snowy-scene.scss'
})
export class SnowyScene {
  @Input() isNight = false;

  snowflakes = Array.from({ length: 100 }).map(() => ({
    left: Math.random() * 100, // Prozent Position links
    delay: Math.random() * 20,  // Startverzögerung
    duration: 10 + Math.random() * 25, // Dauer
    size: 2 + Math.random() * 6 // zwischen 4px und 16px
  }));
}
