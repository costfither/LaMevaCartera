import { ActionReducerMap } from '@ngrx/store';
import { CategoriesEffects } from './Categories/effects';
import * as categoryReducer from './Categories/reducer';
import { DataEffects } from './data/effects';
import * as dataReducer from './data/reducer';
import { UserEffects } from './User/effects';
import * as userReducer from './User/reducer';

export interface AppState {
  transactionState: dataReducer.DatasState;
  userState: userReducer.UserState;
  categoryState: categoryReducer.CategoriesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  transactionState: dataReducer.dataReducer,
  userState: userReducer.userReducer,
  categoryState: categoryReducer.categoryReducer,
};

export const EffectsArray: any[] = [
  UserEffects,
  DataEffects,
  CategoriesEffects,
];
