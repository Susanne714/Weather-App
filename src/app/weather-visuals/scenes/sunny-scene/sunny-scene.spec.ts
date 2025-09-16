import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunnyScene } from './sunny-scene';

describe('SunnyScene', () => {
  let component: SunnyScene;
  let fixture: ComponentFixture<SunnyScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunnyScene]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SunnyScene);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
