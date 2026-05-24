# Photo Library

An Angular application that displays a photo feed with infinite scroll and allows users to save and manage favorite photos.

## Features

- Infinite scrolling photo feed
- Click photos to add them to favorites
- Favorite photos are persisted in the browser's localStorage
- Dedicated photo details page with a "remove from favorites" action

## Tech Stack

- Latest [Angular](https://angular.dev/) version 21.2.11
- Signals and Standalone Components
- Angular Material
- RxJS

## Getting Started

### Install dependencies
```bash
npm install
```

### Run locally
```bash
ng serve --open
```

App will be available at:
http://localhost:4200

## Run tests
```bash
npm test
```

## Design decisions & Notes

- Application markup and styling are kept inside components since the application scope is small to avoid unnecessary file splitting and keep components self-contained and easy to manage.
- If the application grows, templates and styles can be extracted into dedicated HTML and CSS files for larger-scale maintainability.
- Favorites are stored in `localStorage`
- Infinite scroll is implemented using a window scroll listener
- Photo data is generated using Picsum API
- Components are built with standalone Angular architecture

## Project Structure

- features: Application pages (photos, favorites, details)
- services: Data and state management
- shared: UI components
- types: Shared TypeScript types

## Future Improvements

- Visual indication for already-favorited photos
- [Toast/snackbar](https://material.angular.dev/components/snack-bar/overview) feedback when adding or removing favorites
- Replace the loading indicator with image skeletons for improved UX