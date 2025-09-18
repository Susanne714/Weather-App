import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocationResult } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherBridge {
  private locationRequestSource = new Subject<void>();
  private locationSelectedSource = new Subject<LocationResult>();

  locationRequest$ = this.locationRequestSource.asObservable();
  locationSelected$ = this.locationSelectedSource.asObservable();

  requestCurrentLocation() {
    this.locationRequestSource.next();
  }

  selectLocation(loc: LocationResult) {
    this.locationSelectedSource.next(loc);
  }

}
