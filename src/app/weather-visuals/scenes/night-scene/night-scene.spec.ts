import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightScene } from './night-scene';

describe('NightScene', () => {
  let component: NightScene;
  let fixture: ComponentFixture<NightScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NightScene]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NightScene);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
