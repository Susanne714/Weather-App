import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cloud',
  imports: [CommonModule],
  templateUrl: './cloud.html',
  styleUrl: './cloud.scss'
})
export class Cloud {
  @Input() variant: 'type1' | 'type2' | 'type3' | 'type4' | 'type5' | 'type6' | null = null;
  @Input() mode: 'light' | 'heavy' = 'light';

  clouds: { top: number; left: number; scale: number }[] = [];

  ngOnInit() {
    if (this.mode === 'heavy') {
      this.clouds = Array.from({ length: 15 }, () => ({
        top: Math.random() * 63,   // Y-Position zwischen 0–80%
        left: Math.random() * 100, // X-Position zwischen 0–100%
        scale: 0.5 + Math.random() // Größe 0.5–1.5
      }));
    }
  }

}
