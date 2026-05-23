import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';

import { Favorites as FavoritesService } from '../../services/favorites/favorites'

@Component({
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  template: `

    <section class="flex-center">
      <img class="display-img" [src]="photo()?.url" [alt]="'photo: ' + photo()?.id"/>
      <button
        matButton="filled"
        class="btn-destructive"
        (click)="removeFromFavorites()"
      >
        <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="delete"></mat-icon>
        Remove from favorites
      </button>
    </section>
  `
})
export class PhotoDetails {

  readonly #router = inject(Router);
  readonly #activatedRouite = inject(ActivatedRoute);
  readonly #favoritesService = inject(FavoritesService);

  readonly #photoId = this.#activatedRouite.snapshot.paramMap.get('id');
  protected readonly photo = computed(() =>
    this.#favoritesService
      .favorites()
      .find(photo => photo.id === this.#photoId)
  );

  protected removeFromFavorites() {
    if (!this.#photoId)
      return;

    this.#favoritesService.remove(this.#photoId);
    this.#router.navigate(['/favorites']);
  };
  
}