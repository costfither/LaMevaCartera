import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { User, UserCredential } from 'firebase/auth';

export const register = createAction(
  '[Register Page] Register',
  props<{ email: string; password: string }>()
);
export const registerSuccess = createAction(
  '[Register Page] Register Success',
  props<{ credentials: UserCredential }>()
);
export const registerFailure = createAction(
  '[RegisterPage] Register Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ credentials: UserCredential }>()
);
export const loginFailure = createAction(
  '[Login Page] Login Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const loginGoogle = createAction('[Login Page] Login Google');
export const loginGoogleSuccess = createAction(
  '[Login Page] Login Google Success',
  props<{ credentials: UserCredential }>()
);
export const loginGoogleFailure = createAction(
  '[Login Page] Login Google Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getUser = createAction('[User] get User');
export const getUserSuccess = createAction(
  '[User] get User Success',
  props<{ user: User | null }>()
);
export const getUserFailure = createAction(
  '[User] get User Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction('[Login Page] Logout');
