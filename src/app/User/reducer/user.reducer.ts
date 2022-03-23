import { Action, createReducer, on } from '@ngrx/store';
import {
  getUser,
  getUserFailure,
  getUserSuccess,
  login,
  loginFailure,
  loginGoogle,
  loginGoogleFailure,
  loginGoogleSuccess,
  loginSuccess,
  logout,
  register,
  registerFailure,
  registerSuccess,
} from '../actions';
import { User } from '../models/user.model';

export interface UserState {
  usuario: User | any;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: UserState = {
  usuario: null,
  loading: false,
  loaded: false,
  error: null,
};

const _userReducer = createReducer(
  initialState,
  on(getUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getUserSuccess, (state, action) => ({
    ...state,
    usuario: action.user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(register, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(registerSuccess, (state, action) => ({
    ...state,
    usuario: action.credentials,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(registerFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(login, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(loginSuccess, (state, action) => ({
    ...state,
    usuario: action.credentials,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(loginFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(loginGoogle, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(loginGoogleSuccess, (state, action) => ({
    ...state,
    usuario: action.credentials,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(loginGoogleFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(logout, () => initialState)
);

export function userReducer(
  state: UserState | undefined,
  action: Action
): UserState {
  return _userReducer(state, action);
}
