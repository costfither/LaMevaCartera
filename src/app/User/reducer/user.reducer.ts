import { Action, createReducer, on } from '@ngrx/store';
import {
  getUserById,
  getUserByIdFailure,
  getUserByIdSuccess,
  register,
  registerFailure,
  registerSuccess,
} from '../actions';
import { User } from '../models/user.model';

export interface UserState {
  user: User;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: UserState = {
  user: new User('', '', '', 0, '', '', ''),
  loading: false,
  loaded: false,
  error: null,
};

const _userReducer = createReducer(
  initialState,
  on(register, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(registerSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loaded: true,
    loading: false,
    error: null,
  })),
  on(registerFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getUserById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getUserByIdSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getUserByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function userReducer(
  state: UserState | undefined,
  action: Action
): UserState {
  return _userReducer(state, action);
}
