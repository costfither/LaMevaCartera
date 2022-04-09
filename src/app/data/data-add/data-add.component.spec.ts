import { CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AuthModule } from '@angular/fire/auth';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as CategoryReducer from '../../Categories/reducer';
import * as UserReducer from '../../User/reducer';
import * as DataReducer from '../reducer';
import { DataAddComponent } from './data-add.component';

describe('DataAddComponent', () => {
  let component: DataAddComponent;
  let fixture: ComponentFixture<DataAddComponent>;
  let store: Store<DataReducer.DatasState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        AuthModule,
        StoreModule.forRoot({
          transaction: combineReducers(DataReducer.dataReducer),
          category: combineReducers(CategoryReducer.categoryReducer),
          user: combineReducers(UserReducer.userReducer),
        }),
      ],
      declarations: [DataAddComponent],
      providers: [
        RouterModule,
        FormsModule,
        NgModule,
        { provider: Store },
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DataAddComponent), // replace name as appropriate
          multi: true,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
