import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/persona-selection/persona-selection.component').then(
        (m) => m.PersonaSelectionComponent
      ),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./features/chat/chat-page.component').then(
        (m) => m.ChatPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];