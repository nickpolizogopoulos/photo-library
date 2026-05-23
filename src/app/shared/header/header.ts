import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule
  ],
  template: `
  
    <mat-toolbar class="toolbar">
      <button
        mat-button
        routerLink="/"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        Photos
      </button>

      <button
        mat-button
        routerLink="/favorites"
        routerLinkActive="active"
      >
        Favorites
      </button>
    </mat-toolbar>

  `,
  styles: `
  
    .toolbar {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3rem;
        height: 4rem;
        border-bottom: 1px solid rgb(222, 222, 222);
        position: sticky;
        top: 0;
    }

    .active {
      font-weight: bold;
      border: 1px solid rgb(222, 222, 222);
    }
  `
})
export class Header {}