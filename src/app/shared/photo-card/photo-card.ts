import { Component, input, output } from '@angular/core';

import { Photo } from '../../types/Photo';

@Component({
  selector: 'app-photo-card',
  template: `

    <img
      class="grid-img"
      [alt]="'photo: ' + photo().id"
      [src]="photo().url"
      (click)="photoClicked.emit()"
    />
  `,
  styles: `
  
    .grid-img {
      width: 100%;
      height: 27rem;
      object-fit: cover;
      cursor: pointer;
      transition: transform 80ms ease, box-shadow 140ms ease;

      &:hover {
        box-shadow: 2px 3px 10px rgb(123, 123, 123);
      }
      &:active {
        transform: scale(0.98);
      }
    }
  `
})
export class PhotoCard {

  readonly photo = input.required<Photo>();
  protected readonly photoClicked = output<void>();
}