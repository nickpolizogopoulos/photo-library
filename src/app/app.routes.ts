import { Routes } from '@angular/router';

export const getPageTitle = (pageTitle: string) =>
    `Photo Library - ${pageTitle}`;

export const routes: Routes = [
    {
        path: '',
        title: getPageTitle('Photos'),
        loadComponent: () => import('./features/photos/photos').then(m => m.Photos)
    },
    {
        path: 'favorites',
        title: getPageTitle('Favorites'),
        loadComponent: () => import('./features/favorites/favorites').then(m => m.Favorites)
    },
    {
        path: 'photos/:id',
        title: getPageTitle('Photo'),
        loadComponent: () => import('./features/photo-details/photo-details').then(m => m.PhotoDetails)
    }
];