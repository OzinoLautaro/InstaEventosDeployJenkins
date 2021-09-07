import { TestBed } from '@angular/core/testing';

import { SubscripcionService } from './subscripcion.service';

describe('SubscripcionService', () => {
  let service: SubscripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscripcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
