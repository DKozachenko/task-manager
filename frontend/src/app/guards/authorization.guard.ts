import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot} from '@angular/router';
import { AuthorizationQuery } from '../modules/authorization/store';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authorizationQuery: AuthorizationQuery
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): boolean {
    if (this.authorizationQuery.hasToken) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
