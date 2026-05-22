import { Component, inject, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { Photos as PhotosService } from '../../services/photos/photos';
import { Photo } from '../../types/Photo';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  imports: [
    MatGridListModule,
    MatProgressSpinnerModule
  ],
  template: `
  
    <div class="grid">
      @for (photo of photos(); track photo.id) {
        <img [src]="photo.url" alt="photo: {{photo.id}}" />
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