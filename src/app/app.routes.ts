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
      {
        path: 'product',
        loadComponent: () => import('./pages/client/product/product').then(m => m.Product)
      },
      {
        path: 'product-detail/:id',
        loadComponent: () => import('./pages/client/detail-product/detail-product').then(m => m.DetailProduct)
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/client/blog/blog').then(m => m.Blog)
      },
      {
        path: 'blog-detail',
        loadComponent: () => import('./pages/client/detail-blog/detail-blog').then(m => m.DetailBlog)
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/client/about/about').then(m => m.About)
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/client/contact/contact').then(m => m.Contact)
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/client/cart/cart').then(m => m.Cart)
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/client/register/register').then(m => m.Register)
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/client/login/login').then(m => m.Login)
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
