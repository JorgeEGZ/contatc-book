import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  { 
    path: 'contacts', 
    loadComponent: () => import('./components/contact-list/contact-list.component').then(m => m.ContactListComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'contacts/new', 
    loadComponent: () => import('./components/contact-form/contact-form.component').then(m => m.ContactFormComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'contacts/edit/:id', 
    loadComponent: () => import('./components/contact-form/contact-form.component').then(m => m.ContactFormComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'contacts' }
];