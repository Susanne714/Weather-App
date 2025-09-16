import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowyScene } from './snowy-scene';

describe('SnowyScene', () => {
  let component: SnowyScene;
  let fixture: ComponentFixture<SnowyScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnowyScene]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnowyScene);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
