import { Component, Output, EventEmitter, QueryList, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Weather } from '../services/weather';
import { LocationResult } from '../services/weather';


@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, MatToolbarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  // @Output() locationChange = new EventEmitter<string>();
  @Output() locationChange = new EventEmitter<LocationResult>; //locationtest
  @Output() currentLocationRequested = new EventEmitter<void>();
  @ViewChildren('resultItem') resultItems!: QueryList<ElementRef<HTMLLIElement>>;
  @ViewChild('resultList', { static: false }) resultList!: ElementRef<HTMLDivElement>;

  location: string = '';
  sectionFocused: boolean = false;
  searchResults: LocationResult[] = [];
  highlightedIndex: number = -1; //merkt sich aktiven Eintrag
  showArrowUp = false;
  showArrowDown = true;

  constructor(private weatherService: Weather) { }

  onLocationSubmit() {
    if (!this.location.trim()) return;

    // 👉 Wenn bereits Suchergebnisse da sind → Enter = Auswahl
    if (this.searchResults.length > 0) {
      const index = this.highlightedIndex >= 0 ? this.highlightedIndex : 0;
      this.selectLocation(this.searchResults[index]);
      return;
    }

    // sonst API-Abfrage starten
    this.weatherService.getCoordinatesMultiple(this.location.trim()).subscribe({
      next: (results: LocationResult[]) => {
        this.searchResults = results;
        this.highlightedIndex = -1; // Reset
        this.highlightedIndex = results.length > 0 ? 0 : -1; // 👉 erster Eintrag direkt markiert
      },
      error: () => {
        this.searchResults = [];
        alert('Ort nicht gefunden');
      }
    });
  }

  selectLocation(result: LocationResult) {
    console.log("✅ Gewählter Ort:", result); // 👉 alles sehen: name, lat, lon, country, admin1
    // this.locationChange.emit(result.name);
    this.locationChange.emit(result); //locationtest
    this.searchResults = [];
    this.location = '';
  }

  // 👇 neu: Tastatursteuerung
  onKeyDown(event: KeyboardEvent) {
    if (this.searchResults.length === 0) return;

    if (event.key === 'ArrowDown') {
      this.highlightedIndex = (this.highlightedIndex + 1) % this.searchResults.length;
      this.scrollHighlightedIntoView();
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      this.highlightedIndex = (this.highlightedIndex - 1 + this.searchResults.length) % this.searchResults.length;
      this.scrollHighlightedIntoView();
      event.preventDefault();
    } else if (event.key === 'Enter') {
      this.onLocationSubmit(); // Auswahl oder Suche
      event.preventDefault();
    } else if (event.key === 'Escape') {
      // 👉 Escape: Eingabe und Liste leeren
      this.location = '';
      this.searchResults = [];
      this.highlightedIndex = -1;
      event.preventDefault();
      console.log("🔄 Suche zurückgesetzt");
    }
  }

  private scrollHighlightedIntoView() {
    const items = this.resultItems.toArray();
    const el = items[this.highlightedIndex]?.nativeElement;
    if (el) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }

  onCurrentLocationClick() {
    this.currentLocationRequested.emit();
  }

  onInputFocus() {
    this.sectionFocused = true;
  }

  onInputBlur() {
    this.sectionFocused = false;
  }

  ngAfterViewInit() {
    this.updateArrowVisibility();
  };

  onResultsScroll() {
    this.updateArrowVisibility();
  };

  private updateArrowVisibility() {
    const el = this.resultList?.nativeElement;
    if (!el) return;

    this.showArrowUp = el.scrollTop > 0;
    this.showArrowDown = el.scrollTop + el.clientHeight < el.scrollHeight;
  }

  scrollList(direction: 'up' | 'down') {
    const el = this.resultList?.nativeElement;
    if (!el) return;

    const scrollAmount = 100;
    el.scrollBy({
      top: direction === 'up' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(() => this.updateArrowVisibility(), 300);
  }
}