import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainyScene } from './rainy-scene';

describe('RainyScene', () => {
  let component: RainyScene;
  let fixture: ComponentFixture<RainyScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RainyScene]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RainyScene);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
