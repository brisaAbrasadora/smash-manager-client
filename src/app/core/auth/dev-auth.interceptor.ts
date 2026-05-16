import { HttpInterceptorFn } from "@angular/common/http";

const DEV_ACCESS_TOKEN_KEY = 'smash_manager_dev_access_token';

export const devAuthInterceptor: HttpInterceptorFn = (request, next) => {
  const accessToken = localStorage.getItem(DEV_ACCESS_TOKEN_KEY);

  if (!accessToken) {
    return next(request);
  }

  return next(
    request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
    }),
  );
};