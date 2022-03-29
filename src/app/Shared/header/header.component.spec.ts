import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HeaderComponent } from './header.component';

class TemporalComponentForRouter {}
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: TemporalComponentForRouter },
          { path: 'login', component: TemporalComponentForRouter },
          { path: 'category/add', component: TemporalComponentForRouter },
          { path: 'data/add', component: TemporalComponentForRouter },
        ]),
        StoreModule,
        MatMenuModule,
      ],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [provideMockStore({}), MatMenuModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home', () => {
    //declarem el router
    const router = TestBed.inject(Router);
    //espiem que el router escolti si es critada pel metode 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    //executem el método home del HomeComponent
    component.goHome();
    //espera que es llenci un 'navigateByUrl' amb argument ''
    expect(spy).toHaveBeenCalledWith('');
  });

  it('should navigate to login', () => {
    //declarem el router
    const router = TestBed.inject(Router);
    //espiem que el router escolti si es critada pel metode 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    //executem el método Login del LoginComponent
    component.goLogin();
    //espera que es llenci un 'navigateByUrl' amb argument 'login'
    expect(spy).toHaveBeenCalledWith('login');
  });

  it('should navigate to category/add', () => {
    //declarem el router
    const router = TestBed.inject(Router);
    //espiem que el router escolti si es critada pel metode 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    //executem el método category del CategoriaAddComponent
    component.goAddCategory();
    //espera que es llenci un 'navigateByUrl' amb argument 'category/add'
    expect(spy).toHaveBeenCalledWith('category/add');
  });

  it('should navigate to data/add', () => {
    //declarem el router
    const router = TestBed.inject(Router);
    //espiem que el router escolti si es critada pel metode 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    //executem el método dataAdd del DataAddComponent
    component.goAddData();
    //espera que es llenci un 'navigateByUrl' amb argument 'data/add'
    expect(spy).toHaveBeenCalledWith('data/add');
  });
});
