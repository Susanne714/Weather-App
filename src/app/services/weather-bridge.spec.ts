import { TestBed } from '@angular/core/testing';

import { WeatherBridge } from './weather-bridge';

describe('WeatherBridge', () => {
  let service: WeatherBridge;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherBridge);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
