import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { categoria } from '../models/categoria.model';

export const createCategories = createAction(
  '[CategoriaAdd] Create Categoria',
  props<{ category: categoria }>()
);
export const createCategoriesSuccess = createAction(
  '[CategoriaAdd] Create Categoria Success'
);
export const createCategoriesFailure = createAction(
  '[CategoriaAdd] Create Categoria Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getCategoriesbyUID = createAction(
  '[CategoriaList] Get categories per UID',
  props<{ UID: string }>()
);
export const getCategoriesbyUIDSuccess = createAction(
  '[CategoriaList] Get categories per UID Success',
  props<{ categories: categoria[] }>()
);
export const getCategoriesbyUIDFailure = createAction(
  '[CategoriaList] Get categories per UID Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getCategorybyID = createAction(
  '[CategoriaAdd] Get category per ID',
  props<{ idCategory: string; UID: string }>()
);
export const getCategorybyIDSuccess = createAction(
  '[CategoriaAdd] Get category per ID Success',
  props<{ categoria: categoria }>()
);
export const getCategorybyIDFailure = createAction(
  '[CategoriaAdd] Get category per ID Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateCategory = createAction(
  '[CategoriaAdd] Update category',
  props<{ idCategory: string; category: categoria }>()
);
export const updateCategorySuccess = createAction(
  '[CategoriaAdd] Update category per ID Success'
);
export const updateCategoryFailure = createAction(
  '[CategoriaAdd] Update category per ID Failure',
  props<{ payload: HttpErrorResponse }>()
);
export const deleteCategory = createAction(
  '[CategoriaAdd] Delete category',
  props<{ category: categoria }>()
);
export const deleteCategorySuccess = createAction(
  '[CategoriaAdd] Delete category'
);
export const deleteCategoryFailure = createAction(
  '[CategoriaAdd] Delete category',
  props<{ payload: HttpErrorResponse }>()
);
