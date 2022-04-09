import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as CategoriaAction from '../actions';
import { CategoriaService } from '../service/categoria.service';

@Injectable()
export class CategoriesEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriaService
  ) {
    this.responseOK = false;
  }

  createCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriaAction.createCategories),
      exhaustMap(({ category }) =>
        this.categoriesService.createCategory(category).pipe(
          map(() => {
            return CategoriaAction.createCategoriesSuccess();
          }),
          catchError((error) => {
            return of(
              CategoriaAction.createCategoriesFailure({ payload: error })
            );
          })
        )
      )
    )
  );
  createCategoriesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriaAction.createCategoriesSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );
  createCategoriesFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriaAction.createCategoriesFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  getCategoriesbyUID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriaAction.getCategoriesbyUID),
      exhaustMap(({ UID }) =>
        this.categoriesService.getCategoriesbyUID(UID).pipe(
          map((categoria) => {
            return CategoriaAction.getCategoriesbyUIDSuccess({
              categories: categoria,
            });
          }),
          catchError((error) => {
            return of(
              CategoriaAction.createCategoriesFailure({ payload: error })
            );
          })
        )
      )
    )
  );
  getCategoriesbyUIDSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriaAction.getCategoriesbyUIDSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );
  getCategoriesbyUIDFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriaAction.getCategoriesbyUIDFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  getCategorybyId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriaAction.getCategorybyID),
      exhaustMap(({ idCategory, UID }) =>
        this.categoriesService.getCategorybyId({ idCategory, UID }).pipe(
          map((categoria) =>
            CategoriaAction.getCategorybyIDSuccess({
              categoria: categoria[0],
            })
          ),
          catchError((error) =>
            of(CategoriaAction.getCategorybyIDFailure({ payload: error }))
          )
        )
      )
    )
  );
  getCategorybyIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriaAction.getCategorybyIDFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriaAction.updateCategory),
      exhaustMap(({ idCategory, category }) =>
        this.categoriesService.updateCategory(idCategory, category).pipe(
          map(() => {
            return CategoriaAction.updateCategorySuccess();
          }),
          catchError((error) => {
            return of(
              CategoriaAction.updateCategoryFailure({ payload: error })
            );
          })
        )
      )
    )
  );
  updateCategorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriaAction.updateCategorySuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );
  updateCategoryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriaAction.updateCategoryFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriaAction.deleteCategory),
      exhaustMap(({ category }) =>
        this.categoriesService.deleteCategory(category).pipe(
          map(() => {
            return CategoriaAction.deleteCategorySuccess();
          }),
          catchError((error) => {
            return of(
              CategoriaAction.deleteCategoryFailure({ payload: error })
            );
          })
        )
      )
    )
  );
  deleteCategorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriaAction.deleteCategorySuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );
  deleteCategoryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriaAction.deleteCategoryFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );
}
