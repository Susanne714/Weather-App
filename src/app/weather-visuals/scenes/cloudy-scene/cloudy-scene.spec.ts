import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudyScene } from './cloudy-scene';

describe('CloudyScene', () => {
  let component: CloudyScene;
  let fixture: ComponentFixture<CloudyScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudyScene]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudyScene);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
