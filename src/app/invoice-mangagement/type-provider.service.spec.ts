import { TestBed } from '@angular/core/testing';

import { TypeProviderService } from './type-provider.service';

describe('TypeProviderService', () => {
  let service: TypeProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
