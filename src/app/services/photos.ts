import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { Photo } from '../types/Photo';

@Injectable({
  providedIn: 'root',
})
export class Photos {

  getPhotos(batchSize = 10): Observable<Photo[]> {
    const photos: Photo[] = Array.from({ length: batchSize }).map(() => ({
      id: crypto.randomUUID(),
      url: `https://picsum.photos/300/300?random=${Math.random()}`,
    }));

    const delayMs = 200 + Math.random() * 100;

    return of(photos).pipe(delay(delayMs));
  };

}