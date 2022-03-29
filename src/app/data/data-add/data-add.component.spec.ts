import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AuthModule } from '@angular/fire/auth';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { environment } from 'src/environments/environment';
import { DataAddComponent } from './data-add.component';

describe('DataAddComponent', () => {
  let component: DataAddComponent;
  let fixture: ComponentFixture<DataAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        AuthModule,
        StoreModule,
      ],
      declarations: [DataAddComponent],
      providers: [
        RouterModule,
        provideMockStore({}),
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DataAddComponent), // replace name as appropriate
          multi: true,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
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
