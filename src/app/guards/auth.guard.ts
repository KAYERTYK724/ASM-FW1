import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const auth = inject(AuthService);

  // tránh lỗi SSR
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = auth.getToken();

  //  chưa login
  if (!token) {
    return router.createUrlTree(['/login']);
  }

  try {

    const decoded: any = jwtDecode(token);

    // token không hợp lệ
    if (!decoded?.exp) {
      auth.logout();
      return router.createUrlTree(['/login']);
    }

    const now = Math.floor(Date.now() / 1000);

    // token hết hạn
    if (decoded.exp < now) {
      auth.logout();
      return router.createUrlTree(['/login']);
    }

    // hợp lệ
    return true;

  } catch (error) {

    auth.logout();
    return router.createUrlTree(['/login']);
  }

};