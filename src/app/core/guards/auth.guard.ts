import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { JwtService } from '../services/jwt.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (TokenService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (TokenService.isLoggedIn() && JwtService.isAdmin()) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
