import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThunderstormScene } from './thunderstorm-scene';

describe('ThunderstormScene', () => {
  let component: ThunderstormScene;
  let fixture: ComponentFixture<ThunderstormScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThunderstormScene]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThunderstormScene);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
