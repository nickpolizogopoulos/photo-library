import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Favorites as FavoritesService } from '../../services/favorites/favorites';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  template: `
  
    <div [class.grid]="hasFavorites()">
      @for (photo of favorites(); track photo.id) {
        <img
          [src]="photo.url"
          [alt]="'photo: ' + photo.id"
          (click)="openPhoto(photo.id)"
        />
      }
      @empty {
        <p>Your favorites list is empty. Explore photos and select your favorites.</p>
        <a matButton="filled" routerLink="/">
          <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="arrow_back"></mat-icon>
          Photos
        </a>
      }
    </div>
  `
})
export class Favorites {

  readonly #router = inject(Router);
  readonly #favoritesService = inject(FavoritesService);

  readonly hasFavorites = computed(() => this.#favoritesService.favorites().length > 0);
  readonly favorites = this.#favoritesService.favorites;

  openPhoto(photoId: string) {
    this.#router.navigate(['/photos', photoId]);
  };
  
}