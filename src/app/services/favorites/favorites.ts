import { Injectable, signal } from '@angular/core';

import { Photo } from '../../types/Photo';

@Injectable({
  providedIn: 'root',
})
export class Favorites {
  readonly favorites = signal<Photo[]>(this.#loadFavorites());

  #loadFavorites(): Photo[] {
    const raw = localStorage.getItem('favorites');
    return raw ? JSON.parse(raw) : [];
  };

  #save() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites()));
  };

  add(photo: Photo) {
    const exists = this.favorites().some(p => p.id === photo.id);
    if (exists)
      return;

    this.favorites.update(previous => [...previous, photo]);
    this.#save();
  };

  remove(id: string) {
    this.favorites.update(previous => previous.filter(p => p.id !== id));
    this.#save();
  };

}