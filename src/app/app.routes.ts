import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { ClientLayout } from './layouts/client-layout/client-layout';

// 👉 IMPORT GUARD
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/client/home/home').then((m) => m.Home),
      },
      {
        path: 'product',
        loadComponent: () => import('./pages/client/product/product').then((m) => m.Product),
      },
      {
        path: 'product-detail/:id',
        loadComponent: () =>
          import('./pages/client/detail-product/detail-product').then((m) => m.DetailProduct),
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/client/blog/blog').then((m) => m.Blog),
      },
      {
        path: 'blog-detail/:id',
        loadComponent: () =>
          import('./pages/client/detail-blog/detail-blog').then((m) => m.DetailBlog),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/client/about/about').then((m) => m.About),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/client/contact/contact').then((m) => m.Contact),
      },

      // 🔐 CART (PHẢI LOGIN)
      {
        path: 'cart',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/client/cart/cart').then((m) => m.Cart),
      },

      {
        path: 'register',
        loadComponent: () => import('./pages/client/register/register').then((m) => m.Register),
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/client/login/login').then((m) => m.Login),
      },

      //  PROFILE (PHẢI LOGIN)
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/client/profile/profile').then((m) => m.Profile),
      },
    ],
  },

  // 🔥 ADMIN (PHẢI LOGIN + ADMIN)
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard, adminGuard], //  QUAN TRỌNG
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./pages/admin/category/list/category').then((m) => m.Category),
      },
      {
        path: 'category/add',
        loadComponent: () =>
          import('./pages/admin/category/add/add').then((m) => m.Add),
      },
      {
        path: 'category/edit/:id',
        loadComponent: () =>
          import('./pages/admin/category/edit/edit').then((m) => m.CategoryEdit),
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./pages/admin/products/list/product').then((m) => m.Product),
      },
      {
        path: 'product-add',
        loadComponent: () =>
          import('./pages/admin/products/add/add').then((m) => m.Add),
      },
      {
        path: 'product-view/:id',
        loadComponent: () =>
          import('./pages/admin/products/view/view').then((m) => m.View),
      },
      {
        path: 'product-edit/:id',
        loadComponent: () =>
          import('./pages/admin/products/edit/edit').then((m) => m.Edit),
      },
      {
        path: 'comment',
        loadComponent: () =>
          import('./pages/admin/comment/list/list').then((m) => m.List),
      }
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];