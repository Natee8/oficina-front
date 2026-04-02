import { ApplicationConfig, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptorFn } from './core/interceptors/auth.interceptor';
import { UserService } from './core/services/user.service';
import { TokenService } from './core/services/token.service';
import { Router } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    {
      provide: APP_INITIALIZER,
      useFactory: () => async () => {
        const userService = inject(UserService);
        const router = inject(Router);

        if (TokenService.isLoggedIn()) {
          const user = await userService.loadUser();
          if (!user) {
            TokenService.removeToken();
            router.navigate(['/login']);
          }
        } else {
          router.navigate(['/login']);
        }
      },
      multi: true,
    },
  ],
};
