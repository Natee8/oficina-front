import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../../core/services/token.service';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const token = TokenService.getToken();
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }
  return next(req);
};
