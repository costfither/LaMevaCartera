import { ActionReducerMap } from '@ngrx/store';
import { CategoriesEffects } from './Categories/effects';
import * as categoryReducer from './Categories/reducer';
import { DataEffects } from './data/effects';
import * as dataReducer from './data/reducer';
import { UserEffects } from './User/effects';
import * as userReducer from './User/reducer';

export interface AppState {
  transaction: dataReducer.DatasState;
  user: userReducer.UserState;
  category: categoryReducer.CategoriesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  transaction: dataReducer.dataReducer,
  user: userReducer.userReducer,
  category: categoryReducer.categoryReducer,
};

export const EffectsArray: any[] = [
  UserEffects,
  DataEffects,
  CategoriesEffects,
];
