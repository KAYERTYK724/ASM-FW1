import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getUser();

  if (user?.role === 'admin') {
    return true;
  }

  router.navigate(['/']);
  return false;
};