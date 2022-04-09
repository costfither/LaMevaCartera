import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseAppModule } from '@angular/fire/app';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../app.reducers';
import { categoria } from '../models/categoria.model';
import { CategoriaAddComponent } from './categoria-add.component';
class TemporalComponentForRoutes {}

describe('CategoriaAddComponent', () => {
  let component: CategoriaAddComponent;
  let fixture: ComponentFixture<CategoriaAddComponent>;

  let initialState = {
    userState: {
      usuario: {
        UID: '01ORm4Dk26T1GuFM5qNsWpPstW32',
        email: 'arnau.costabella@gmail.com',
      },
    },
    categoryState: {
      category: {
        UID: '01ORm4Dk26T1GuFM5qNsWpPstW32',
        name: 'rqwerqwer',
        description: 'qwerqwerqwe',
        color: '#d89797',
        id: 'E1z5zrEJjseXFqPg1lYg',
      },
    },
  } as AppState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'category/E1z5zrEJjseXFqPg1lYg',
            component: TemporalComponentForRoutes,
          },
          {
            path: 'category/add',
            component: TemporalComponentForRoutes,
          },
        ]),
        FirebaseAppModule,
        ReactiveFormsModule,
        StoreModule,
      ],
      declarations: [CategoriaAddComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('TEST1: should create', () => {
    expect(component).toBeTruthy();
  });

  it('TEST2: should navigate to category', () => {
    //declarem el router
    const router = TestBed.inject(Router);
    //espiem que el router escolti si es critada pel metode 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    //executem el método category del CategoriaAddComponent
    component.goListCategory();
    //espera que es llenci un 'navigateByUrl' amb argument 'category'
    expect(spy).toHaveBeenCalledWith('category');
  });
  it('TEST3: update', () => {
    component.name.setValue('rqwerqwer');
    component.description.setValue('qwerqwerqwe');
    component.color.setValue('#d89797');
    
    component.saveCategory();
  });
});
