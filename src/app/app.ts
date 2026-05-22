import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './shared/header/header';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    RouterOutlet
  ],
  template: `
  
    <app-header></app-header>
    <section class="page">
      <router-outlet></router-outlet>
    </section>
  
  `
})
export class App {}