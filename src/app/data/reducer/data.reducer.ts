import { Action, createReducer, on } from '@ngrx/store';
import {
  createData,
  createDataFailure,
  createDataSuccess,
  deleteData,
  deleteDataFailure,
  deleteDataSuccess,
  getDatabyID,
  getDatabyIDFailure,
  getDatabyIDSuccess,
  getDatabyUID,
  getDatabyUIDFailure,
  getDatabyUIDSuccess,
  resetData,
  updateData,
  updateDataFailure,
  updateDataSuccess,
} from '../actions';
import { data } from '../models/data.model';

export interface DatasState {
  transactions: data[];
  transaction: data;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: DatasState = {
  transactions: new Array<data>(),
  transaction: new data('', '', [], 0, false, '', new Date()),
  loading: false,
  loaded: false,
  error: null,
};

const _dataReducer = createReducer(
  initialState,
  on(getDatabyID, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getDatabyIDSuccess, (state, action) => ({
    ...state,
    transaction: action.transaction,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getDatabyIDFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getDatabyUID, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getDatabyUIDSuccess, (state, action) => ({
    ...state,
    transactions: action.transactions,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getDatabyUIDFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(updateData, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateDataSuccess, (state, action) => ({
    ...state,
    transaction: action.transaction,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateDataFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(createData, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(createDataSuccess, (state, action) => ({
    ...state,
    transaction: action.transaction,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createDataFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(deleteData, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteDataSuccess, (state, action) => ({
    ...state,
    transaction: action.transaction,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteDataFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(resetData, () => initialState)
);

export function dataReducer(
  state: DatasState | undefined,
  action: Action
): DatasState {
  return _dataReducer(state, action);
}
