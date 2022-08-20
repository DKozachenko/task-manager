import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import { AuthorizationQuery } from 'src/app/modules/authorization/store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private authorizationQuery: AuthorizationQuery,
              private router: Router) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /** Если есть токен, то устанавливаем его в заголовках */
    if (this.authorizationQuery.hasToken) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authorizationQuery.getToken
        }
      });
    }

    return next.handle(req)
      .pipe(
        catchError(
          (err: HttpErrorResponse) => {
            this.router.navigate(['/']);
            return throwError(err);
          }
        )
      );
  }
}
