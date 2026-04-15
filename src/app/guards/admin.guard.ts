import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem("token");

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  try {
    const decoded: any = jwtDecode(token);

    if (decoded.role !== 'admin') {
      return router.createUrlTree(['/']);
    }

    return true;

  } catch {
    return router.createUrlTree(['/login']);
  }

};