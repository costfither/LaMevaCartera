import { Action, createReducer, on } from '@ngrx/store';
import {
  createCategories,
  createCategoriesFailure,
  createCategoriesSuccess,
  deleteCategory,
  deleteCategoryFailure,
  deleteCategorySuccess,
  getCategoriesbyUID,
  getCategoriesbyUIDFailure,
  getCategoriesbyUIDSuccess,
  getCategorybyID,
  getCategorybyIDFailure,
  getCategorybyIDSuccess,
  updateCategory,
  updateCategoryFailure,
  updateCategorySuccess,
} from '../actions';
import { categoria } from '../models/categoria.model';

export interface CategoriesState {
  categories: categoria[];
  category: categoria;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: CategoriesState = {
  categories: new Array<categoria>(),
  category: new categoria('', '', '', '', ''),
  loading: false,
  loaded: false,
  error: null,
};

const _categoryReducer = createReducer(
  initialState,
  on(createCategories, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(createCategoriesSuccess, (state) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createCategoriesFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getCategoriesbyUID, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getCategoriesbyUIDSuccess, (state, action) => ({
    ...state,
    categories: action.categories,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getCategoriesbyUIDFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getCategorybyID, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getCategorybyIDSuccess, (state, action) => ({
    ...state,
    category: action.categoria,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getCategorybyIDFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(updateCategory, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateCategorySuccess, (state) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateCategoryFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(deleteCategory, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteCategorySuccess, (state) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteCategoryFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function categoryReducer(
  state: CategoriesState | undefined,
  action: Action
): CategoriesState {
  return _categoryReducer(state, action);
}
