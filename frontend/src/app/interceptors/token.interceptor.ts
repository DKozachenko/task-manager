import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import { AuthorizationQuery } from 'src/app/modules/authorization/store';

/**
 * Интерсептор для перехвата запросов и установки токена
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private authorizationQuery: AuthorizationQuery,
              private router: Router) {
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
