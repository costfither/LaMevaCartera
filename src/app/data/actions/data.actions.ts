import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { data } from '../models/data.model';

export const createData = createAction(
  '[DataAdd] Create data',
  props<{ transaction: data }>()
);
export const createDataSuccess = createAction(
  '[DataAdd] Create data Success',
  props<{ transaction: data }>()
);
export const createDataFailure = createAction(
  '[DataAdd] Create data Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getDatabyUID = createAction(
  '[DataList] Get data per UID',
  props<{ UID: string }>()
);
export const getDatabyUIDSuccess = createAction(
  '[DataList] Get data per UID Success',
  props<{ transactions: data[] }>()
);
export const getDatabyUIDFailure = createAction(
  '[DataList] Get data per UID Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getDatabyID = createAction(
  '[DataAdd] Get data per ID',
  props<{ idData: string; UID: string }>()
);
export const getDatabyIDSuccess = createAction(
  '[DataAdd] Get data per ID Success',
  props<{ transaction: data }>()
);
export const getDatabyIDFailure = createAction(
  '[DataAdd] Get data per ID Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateData = createAction(
  '[DataAdd] Update data',
  props<{ id: string; transaction: data }>()
);
export const updateDataSuccess = createAction(
  '[DataAdd] Update data Success',
  props<{ id: string; transaction: data }>()
);
export const updateDataFailure = createAction(
  '[DataAdd] Update data Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteData = createAction(
  '[DataAdd] Delete data',
  props<{ transaction: data }>()
);
export const deleteDataSuccess = createAction(
  '[DataAdd] Delete data Success',
  props<{ transaction: data }>()
);
export const deleteDataFailure = createAction(
  '[DataAdd] Delete data Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const resetData = createAction('[DataList] Reset data');
