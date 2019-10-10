import { TestBed } from '@angular/core/testing';

import { MedicareDataService } from './medicare-data.service';

describe('MedicareDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicareDataService = TestBed.get(MedicareDataService);
    expect(service).toBeTruthy();
  });
});
