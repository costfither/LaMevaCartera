import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as UserActions from '../actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(private actions$: Actions, private userService: UserService) {
    this.responseOK = false;
  }

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      exhaustMap(({ email, password }) =>
        this.userService.register(email, password).pipe(
          map((user) => {
            return UserActions.registerSuccess({ credentials: user });
          }),
          catchError((error) => {
            return of(UserActions.registerFailure({ payload: error }));
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      exhaustMap(({ email, password }) => {
        return this.userService.login(email, password).pipe(
          map((user) => {
            return UserActions.loginSuccess({ credentials: user });
          }),
          catchError((error) => {
            return of(UserActions.loginFailure({ payload: error }));
          })
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logout),
        map(() => {
          this.userService.logout();
        })
      ),
    { dispatch: false }
  );

  loginGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginGoogle),
      exhaustMap(() => {
        return this.userService.GoogleAuth().pipe(
          map((user) => {
            return UserActions.loginGoogleSuccess({ credentials: user });
          }),
          catchError((error) => {
            return of(UserActions.loginGoogleFailure({ payload: error }));
          })
        );
      })
    )
  );

  loginGoogleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginGoogleSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  loginGoogleFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginGoogleFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      exhaustMap(() => {
        return this.userService.getUser().pipe(
          map((user) => {
            return UserActions.getUserSuccess({ user: user });
          }),
          catchError((error) => {
            return of(UserActions.loginGoogleFailure({ payload: error }));
          })
        );
      })
    )
  );

  getUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  getUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );
}
