import { Component, inject, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';

import { Photos as PhotosService } from '../../services/photos/photos';
import { Favorites as FavoritesService } from '../../services/favorites/favorites';
import { type Photo } from '../../types/Photo';

@Component({
  imports: [
    MatGridListModule,
    MatProgressSpinnerModule
  ],
  template: `
  
    <div class="grid">
      @for (photo of photos(); track photo.id) {
        <img
          alt="photo: {{ photo.id }}"
          [src]="photo.url"
          (click)="addToFavorites(photo)"
        />
      }
    </div>

    @if (loading()) {
      <div class="loader">
        <mat-spinner></mat-spinner>
      </div>
    }
  `
})
export class Photos implements AfterViewInit, OnDestroy {

  readonly #photosService = inject(PhotosService);
  readonly #favoritesService = inject(FavoritesService);

  constructor() {
    this.#loadPhotos();
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.#onScroll.bind(this));
  };
  ngOnDestroy() {
    window.removeEventListener('scroll', this.#onScroll);
  };

  readonly photos = signal<Photo[]>([]);
  readonly loading = signal(false);

  protected addToFavorites(photo: Photo) {
    this.#favoritesService.add(photo);
  };

  #loadPhotos() {
    if (this.loading())
      return;

    this.loading.set(true);

    this.#photosService.getPhotos(10)
      .subscribe(photos => {
        this.photos.update(previous => [...previous, ...photos]);
        this.loading.set(false);
      });
  };
  
  #onScroll() {
    if (this.loading())
      return;

    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    const atBottom = scrollTop + viewportHeight >= fullHeight - 10;

    if (atBottom)
      this.#loadPhotos();
  };

}