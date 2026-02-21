import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalSearch } from './chemical-search';

describe('ChemicalSearch', () => {
  let component: ChemicalSearch;
  let fixture: ComponentFixture<ChemicalSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChemicalSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChemicalSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
