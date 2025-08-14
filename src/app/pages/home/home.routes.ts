import { Routes } from '@angular/router';
import { HomePage } from './home.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'profile',
        loadComponent: () => import('../../components/profile/profile.component').then(m => m.ProfileComponent)
      },
       {
        path: 'dashboard',
        loadComponent: () => import('../../components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
        {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
