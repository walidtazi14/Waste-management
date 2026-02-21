import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumDetailShell } from './drum-detail-shell';

describe('DrumDetailShell', () => {
  let component: DrumDetailShell;
  let fixture: ComponentFixture<DrumDetailShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrumDetailShell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrumDetailShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
