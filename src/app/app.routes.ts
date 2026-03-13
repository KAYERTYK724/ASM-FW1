import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { ClientLayout } from './layouts/client-layout/client-layout';

export const routes: Routes = [
  {
    path: "",
    component: ClientLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/client/home/home').then(m => m.Home)
      },
    ],
  },
  {
    path: "admin",
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard)
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
