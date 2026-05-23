import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { Photo } from '../../types/Photo';

@Injectable({
  providedIn: 'root',
})
export class Photos {

  getPhotos(batchSize = 10): Observable<Photo[]> {
      const photos: Photo[] = Array.from({ length: batchSize }).map(() => {
      const id = crypto.randomUUID();
      // Picsum seed keeps the image consistent for each id
      return { id, url: `https://picsum.photos/seed/${id}/1500/1300`};
    });

    const delayMs = 200 + Math.random() * 100;

    return of(photos).pipe(delay(delayMs));
  };

}