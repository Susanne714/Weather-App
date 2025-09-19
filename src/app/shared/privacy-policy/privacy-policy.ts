import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss'
})
export class PrivacyPolicy {

  constructor(private meta: Meta) {
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }

}
