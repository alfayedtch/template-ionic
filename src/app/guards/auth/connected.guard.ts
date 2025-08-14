import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const connectedGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthenticated()
  ?inject(Router).createUrlTree(['home'])
  :true;
};
