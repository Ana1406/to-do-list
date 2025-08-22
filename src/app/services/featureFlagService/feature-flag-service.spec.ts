import { TestBed } from '@angular/core/testing';
import { FeatureFlagService } from './feature-flag-service';
import { RemoteConfig } from '@angular/fire/remote-config';

class RemoteConfigMock {
  constructor() { }
}

describe('FeatureFlagService', () => {
  let service: FeatureFlagService;
  let rcMock: RemoteConfigMock;

  beforeEach(() => {
    rcMock = new RemoteConfigMock() as any;

    TestBed.configureTestingModule({
      providers: [
        FeatureFlagService,
        { provide: RemoteConfig, useValue: rcMock }
      ]
    });

    service = TestBed.inject(FeatureFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
