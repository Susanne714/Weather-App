import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rain',
  imports: [CommonModule],
  templateUrl: './rain.html',
  styleUrl: './rain.scss'
})
export class Rain {
  raindrops = Array.from({ length: 300 }).map(() => ({
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
    size: 5 + Math.random() * 20
  }));
}
