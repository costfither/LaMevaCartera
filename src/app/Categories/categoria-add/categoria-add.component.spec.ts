import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseAppModule } from '@angular/fire/app';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { CategoriaAddComponent } from './categoria-add.component';
class TemporalComponentForRoutes {}

describe('CategoriaAddComponent', () => {
  let component: CategoriaAddComponent;
  let fixture: ComponentFixture<CategoriaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: TemporalComponentForRoutes,
          },
        ]),
        FirebaseAppModule,
        ReactiveFormsModule,
        StoreModule,
      ],
      declarations: [CategoriaAddComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [provideMockStore({})],
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

  it('should navigate to category', () => {
    //declarem el router
    const router = TestBed.inject(Router);
    //espiem que el router escolti si es critada pel metode 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    //executem el método category del CategoriaAddComponent
    component.goListCategory();
    //espera que es llenci un 'navigateByUrl' amb argument 'category'
    expect(spy).toHaveBeenCalledWith('category');
  });
});
