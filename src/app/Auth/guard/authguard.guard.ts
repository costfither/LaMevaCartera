import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import * as UserAction from '../../User/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthguardGuard implements CanActivate {
  userUID: string = '';

  constructor(private router: Router, private store: Store<AppState>) {
    this.store.select('userState').subscribe((user) => {
      if (user.usuario?.uid) this.userUID = user.usuario.uid;
    });
    this.store.dispatch(UserAction.getUser());
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userUID) {
      return true;
    }
    this.router.navigate(['/login']);

    return false;
  }
}
