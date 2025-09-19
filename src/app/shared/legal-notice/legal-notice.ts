import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-legal-notice',
  imports: [RouterLink],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss'
})
export class LegalNotice {

  constructor(private meta: Meta) {
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }

}
