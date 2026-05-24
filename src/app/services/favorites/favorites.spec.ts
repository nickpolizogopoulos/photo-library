import { TestBed } from '@angular/core/testing';

import { Favorites } from './favorites';

describe('Favorites service', () => {
  let service: Favorites;

  const mockPhoto = {
    id: '1',
    url: 'https://example.com/photo.jpg'
  };

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(Favorites);
  });

  it('should add a photo to favorites', () => {
    service.add(mockPhoto);

    expect(service.favorites()).toEqual([mockPhoto]);
  });

  it('should not add duplicate photos', () => {
    service.add(mockPhoto);
    service.add(mockPhoto);

    expect(service.favorites()).toEqual([mockPhoto]);
  });

  it('should remove a photo from favorites', () => {
    service.add(mockPhoto);
    service.remove(mockPhoto.id);

    expect(service.favorites()).toEqual([]);
  });


  it('should save favorites to localStorage', () => {
    service.add(mockPhoto);
    const stored = localStorage.getItem('favorites');

    expect(stored).toContain(mockPhoto.id);
  });


});
