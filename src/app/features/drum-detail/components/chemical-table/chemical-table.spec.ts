import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalTable } from './chemical-table';

describe('ChemicalTable', () => {
  let component: ChemicalTable;
  let fixture: ComponentFixture<ChemicalTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChemicalTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChemicalTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
