import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';

import { Favorites as FavoritesService } from '../../services/favorites/favorites';
import { PhotoCard } from "../../shared/photo-card/photo-card";

@Component({
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    PhotoCard
],
  template: `
  
    <div [class.grid]="hasFavorites()">
      @for (photo of favorites(); track photo.id) {
        <app-photo-card [photo]="photo" (photoClicked)="openPhoto(photo.id)" />
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