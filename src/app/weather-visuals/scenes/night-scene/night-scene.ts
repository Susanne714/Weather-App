import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Star {
  top: string;
  left: string;
  size: string;
  duration: string;
}

@Component({
  selector: 'app-night-scene',
  imports: [CommonModule],
  templateUrl: './night-scene.html',
  styleUrl: './night-scene.scss'
})

export class NightScene implements OnInit {
  stars: Star[] = [];

  ngOnInit(): void {
    this.generateStars(80);
  }

  generateStars(count: number): void {
    for (let i = 0; i < count; i++) {
      this.stars.push({
        top: `${Math.random() * 63}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 1}px`, // 1px - 3px
        duration: `${Math.random() * 3 + 1.5}s` // 1.5s - 4.5s
      });
    }
  }

}
