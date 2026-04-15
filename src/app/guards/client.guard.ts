import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const clientGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getUser();

  // nếu là admin → đá về admin
  if (user?.role === 'admin') {
    router.navigate(['/admin']);
    return false;
  }

  return true;
};