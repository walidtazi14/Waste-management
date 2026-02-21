import { TestBed } from '@angular/core/testing';

import { Drum } from './drum';

describe('Drum', () => {
  let service: Drum;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Drum);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
