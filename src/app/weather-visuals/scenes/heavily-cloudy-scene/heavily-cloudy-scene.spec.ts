import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeavilyCloudyScene } from './heavily-cloudy-scene';

describe('HeavilyCloudyScene', () => {
  let component: HeavilyCloudyScene;
  let fixture: ComponentFixture<HeavilyCloudyScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeavilyCloudyScene]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeavilyCloudyScene);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
