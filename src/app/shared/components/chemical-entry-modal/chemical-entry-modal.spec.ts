import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalEntryModal } from './chemical-entry-modal';

describe('ChemicalEntryModal', () => {
  let component: ChemicalEntryModal;
  let fixture: ComponentFixture<ChemicalEntryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChemicalEntryModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChemicalEntryModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
