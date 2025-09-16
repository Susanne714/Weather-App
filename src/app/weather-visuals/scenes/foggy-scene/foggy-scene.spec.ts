import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoggyScene } from './foggy-scene';

describe('FoggyScene', () => {
  let component: FoggyScene;
  let fixture: ComponentFixture<FoggyScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoggyScene]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoggyScene);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
