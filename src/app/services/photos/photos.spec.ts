import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { Photos } from './photos';

describe('Photos service', () => {
  let service: Photos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Photos);
  });


  it('should return the requested number of photos', async () => {
    const photos = await firstValueFrom(service.getPhotos(5));

    expect(photos.length).toBe(5);
  });
  
});
