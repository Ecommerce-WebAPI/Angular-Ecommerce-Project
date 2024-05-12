import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  const token = authenticationService.getToken();
  if(token){
    const cloned = req.clone({
      headers:req.headers.set('Authorization', 'Bearer '+token)
    });
    return next(cloned);
  }
  return next(req);
};
