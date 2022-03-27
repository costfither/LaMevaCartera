import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as DataActions from '../actions';
import { DataService } from '../services/data.service';

@Injectable()
export class DataEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(private actions$: Actions, private dataService: DataService) {
    this.responseOK = false;
  }

  getDatabyUID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.getDatabyUID),
      exhaustMap(({ UID }) =>
        this.dataService.getDatabyUID({ UID }).pipe(
          map((data) =>
            DataActions.getDatabyUIDSuccess({ transactions: data })
          ),
          catchError((error) =>
            of(DataActions.getDatabyUIDFailure({ payload: error }))
          )
        )
      )
    )
  );

  getDatabyUIDFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DataActions.getDatabyUIDFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  getDatabyID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.getDatabyID),
      exhaustMap(({ idData, UID }) =>
        this.dataService.getDatabyID({ idData, UID }).pipe(
          map((data) =>
            DataActions.getDatabyIDSuccess({ transaction: data[0] })
          ),
          catchError((error) =>
            of(DataActions.getDatabyIDFailure({ payload: error }))
          )
        )
      )
    )
  );

  getDatabyIDFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DataActions.getDatabyIDFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.updateData),
      exhaustMap(({ id, transaction }) =>
        this.dataService.updateData({ id: id, transaction: transaction }).pipe(
          map(() =>
            DataActions.updateDataSuccess({
              id: id,
              transaction: transaction,
            })
          ),
          catchError((error) =>
            of(DataActions.updateDataFailure({ payload: error }))
          )
        )
      )
    )
  );

  updateDataSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DataActions.updateDataSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateDataFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DataActions.updateDataFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  createData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.createData),
      exhaustMap(({ transaction }) =>
        this.dataService.createData({ transaction: transaction }).pipe(
          map(() => DataActions.createDataSuccess({ transaction })),
          catchError((error) =>
            of(DataActions.createDataFailure({ payload: error }))
          )
        )
      )
    )
  );

  createDataSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DataActions.createDataSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  createDataFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DataActions.createDataFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.deleteData),
      exhaustMap(({ transaction }) =>
        this.dataService.deleteData({ transaction: transaction }).pipe(
          map(() =>
            DataActions.deleteDataSuccess({ transaction: transaction })
          ),
          catchError((error) =>
            of(DataActions.deleteDataFailure({ payload: error }))
          )
        )
      )
    )
  );

  deleteDataFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DataActions.deleteDataFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
        })
      ),
    { dispatch: false }
  );
}
