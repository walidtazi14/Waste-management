import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumForm } from './drum-form';

describe('DrumForm', () => {
  let component: DrumForm;
  let fixture: ComponentFixture<DrumForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrumForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrumForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
